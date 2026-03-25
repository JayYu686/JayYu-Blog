/**
 * Calculate estimated reading time for a markdown text.
 * Chinese: ~300 chars/min, English: ~200 words/min
 */
export function getReadingTime(text: string, lang: 'zh' | 'en' = 'zh'): string {
  // Strip markdown syntax
  const cleaned = text
    .replace(/```[\s\S]*?```/g, '')   // code blocks
    .replace(/`[^`]*`/g, '')           // inline code
    .replace(/!\[.*?\]\(.*?\)/g, '')   // images
    .replace(/\[.*?\]\(.*?\)/g, '')    // links
    .replace(/[#*>_~\-|]/g, '')        // markdown chars
    .trim();

  // Count Chinese chars and English words
  const chineseChars = (cleaned.match(/[\u4e00-\u9fff]/g) || []).length;
  const englishWords = cleaned.replace(/[\u4e00-\u9fff]/g, '').split(/\s+/).filter(w => w.length > 0).length;

  // Weighted reading time
  const minutes = Math.ceil(chineseChars / 300 + englishWords / 200);
  const result = Math.max(1, minutes);

  return lang === 'zh' ? `预计阅读时间：${result} 分钟` : `Estimated reading time: ${result} min`;
}
