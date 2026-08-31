---
title: "用可复现实验拆解 LLM 推理服务优化"
description: "用固定请求集和 OpenAI 兼容接口，对比 PagedAttention、连续批处理与 Prefix Caching 对 TTFT、尾延迟和吞吐的影响。"
pubDate: 2026-08-31
heroImage: "/cover.webp"
tags:
  - AI
  - LLM
  - Benchmark
  - vLLM
category: "AI 工程"
---

LLM Serving 的优化不能只看某一个吞吐数字。一个可复现的实验至少应该同时记录首 Token 延迟（TTFT）、总延迟、P95 尾延迟、输出吞吐和失败率，并固定模型、采样参数与请求分布。

## 实验目标

本文配套的 `scripts/benchmark_llm_serving.py` 使用 OpenAI 兼容的流式接口发起并发请求，输出每个请求的 TTFT 和总延迟，以及整体 P50/P95。它不依赖第三方 Python 包，便于直接放进实验仓库。

重点比较以下变量：

- PagedAttention：减少 KV Cache 的连续内存预留和碎片。
- Continuous Batching：在每个 decode 步骤重新调度活跃请求。
- Prefix Caching：对共享的系统提示词、工具定义或文档前缀复用 KV Cache。

这些能力的具体开关和限制，应以当前 vLLM 版本的官方文档为准；实验报告中需要记录完整启动参数，而不是只写“启用了缓存”。

## 启动一个基线服务

下面是最小的 vLLM 服务示例：

```bash
vllm serve Qwen/Qwen3-8B \
  --host 0.0.0.0 \
  --port 8000 \
  --max-model-len 8192
```

然后运行基线压测：

```bash
python scripts/benchmark_llm_serving.py \
  --url http://localhost:8000/v1/chat/completions \
  --model Qwen/Qwen3-8B \
  --requests 32 \
  --concurrency 8
```

如果要测试共享前缀，使用相同的 `--prefix` 和请求参数，对比启用 Prefix Caching 前后的结果。例如，在支持该参数的 vLLM 版本中：

```bash
vllm serve Qwen/Qwen3-8B \
  --enable-prefix-caching \
  --max-model-len 8192
```

## 如何读结果

`ttft_p50_ms` 主要反映排队和 Prefill 的典型体验，`ttft_p95_ms` 能暴露长请求对短请求的影响；`total_p95_ms` 则反映尾部用户是否被拖慢。`aggregate_tokens_per_second` 适合观察整体吞吐，但不能替代延迟指标。

一次有意义的对比应该固定请求集，只改变一个服务变量，并至少覆盖冷缓存、热缓存、短输入、长输入和不同并发度。若 Prefix Caching 让 TTFT 下降但显存压力升高，就需要继续记录 KV Cache 使用率和 OOM 情况，不能只保留一列“吞吐提升百分比”。

## 参考资料

- [vLLM Documentation](https://docs.vllm.ai/en/v0.21.0/)
- [Efficient Memory Management for Large Language Model Serving with PagedAttention](https://arxiv.org/abs/2309.06180)
