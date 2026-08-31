"""Measure TTFT and end-to-end latency for an OpenAI-compatible streaming server.

Example:
  python scripts/benchmark_llm_serving.py \
    --url http://localhost:8000/v1/chat/completions \
    --model Qwen/Qwen3-8B \
    --concurrency 8 \
    --requests 32

Run the same command against two vLLM configurations to compare prefix caching,
batching, or other serving changes. The script intentionally keeps the workload
and request format fixed so the result is comparable.
"""

from __future__ import annotations

import argparse
import concurrent.futures
import json
import statistics
import time
import urllib.error
import urllib.request
from dataclasses import asdict, dataclass


@dataclass
class Result:
    request_id: int
    ttft_ms: float | None = None
    total_ms: float | None = None
    output_tokens: int | None = None
    error: str | None = None


def percentile(values: list[float], quantile: float) -> float | None:
    if not values:
        return None
    return statistics.quantiles(values, n=100, method="inclusive")[int(quantile * 100) - 1] if len(values) > 1 else values[0]


def run_request(args: argparse.Namespace, request_id: int) -> Result:
    payload = {
        "model": args.model,
        "messages": [
            {"role": "system", "content": args.prefix},
            {"role": "user", "content": f"Give a concise answer to benchmark request {request_id}: {args.prompt}"},
        ],
        "temperature": 0,
        "max_tokens": args.max_tokens,
        "stream": True,
        "stream_options": {"include_usage": True},
    }
    request = urllib.request.Request(
        args.url,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json", "Authorization": f"Bearer {args.api_key}"} if args.api_key else {"Content-Type": "application/json"},
        method="POST",
    )
    started = time.perf_counter()
    first_token_at: float | None = None
    output_tokens: int | None = None

    try:
        with urllib.request.urlopen(request, timeout=args.timeout) as response:
            for raw_line in response:
                line = raw_line.decode("utf-8").strip()
                if not line.startswith("data:"):
                    continue
                data = line[5:].strip()
                if data == "[DONE]":
                    continue
                event = json.loads(data)
                usage = event.get("usage")
                if usage and usage.get("completion_tokens") is not None:
                    output_tokens = usage["completion_tokens"]
                choices = event.get("choices") or []
                delta = choices[0].get("delta", {}) if choices else {}
                if first_token_at is None and (delta.get("content") or delta.get("reasoning_content")):
                    first_token_at = time.perf_counter()
        finished = time.perf_counter()
        return Result(
            request_id=request_id,
            ttft_ms=(first_token_at - started) * 1000 if first_token_at else None,
            total_ms=(finished - started) * 1000,
            output_tokens=output_tokens,
        )
    except (urllib.error.HTTPError, urllib.error.URLError, TimeoutError, json.JSONDecodeError) as error:
        return Result(request_id=request_id, error=str(error))


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--url", default="http://localhost:8000/v1/chat/completions")
    parser.add_argument("--model", required=True)
    parser.add_argument("--requests", type=int, default=16)
    parser.add_argument("--concurrency", type=int, default=4)
    parser.add_argument("--max-tokens", type=int, default=128)
    parser.add_argument("--timeout", type=float, default=180)
    parser.add_argument("--api-key", default="")
    parser.add_argument("--prefix", default="You are a helpful technical assistant. Explain the answer clearly.")
    parser.add_argument("--prompt", default="What is one practical way to reduce repeated computation in an LLM serving system?")
    args = parser.parse_args()

    started = time.perf_counter()
    with concurrent.futures.ThreadPoolExecutor(max_workers=args.concurrency) as executor:
        results = list(executor.map(lambda request_id: run_request(args, request_id), range(args.requests)))
    wall_ms = (time.perf_counter() - started) * 1000

    successful = [result for result in results if result.error is None]
    ttft = [result.ttft_ms for result in successful if result.ttft_ms is not None]
    totals = [result.total_ms for result in successful if result.total_ms is not None]
    token_count = sum(result.output_tokens or 0 for result in successful)
    total_seconds = sum(result.total_ms or 0 for result in successful) / 1000

    report = {
        "config": {"url": args.url, "model": args.model, "requests": args.requests, "concurrency": args.concurrency, "max_tokens": args.max_tokens},
        "summary": {
            "successful": len(successful),
            "failed": len(results) - len(successful),
            "wall_time_ms": round(wall_ms, 2),
            "ttft_p50_ms": round(percentile(ttft, 0.50), 2) if percentile(ttft, 0.50) is not None else None,
            "ttft_p95_ms": round(percentile(ttft, 0.95), 2) if percentile(ttft, 0.95) is not None else None,
            "total_p50_ms": round(percentile(totals, 0.50), 2) if percentile(totals, 0.50) is not None else None,
            "total_p95_ms": round(percentile(totals, 0.95), 2) if percentile(totals, 0.95) is not None else None,
            "output_tokens": token_count,
            "aggregate_tokens_per_second": round(token_count / total_seconds, 2) if total_seconds else None,
        },
        "requests": [asdict(result) for result in results],
    }
    print(json.dumps(report, indent=2))


if __name__ == "__main__":
    main()
