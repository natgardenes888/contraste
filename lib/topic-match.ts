import { feedDictionary } from "@/data/feed-dictionary";
import { topics, type Topic } from "@/data/topics";

function normalize(value: string) {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

export function findTopicMatch(query: string): Topic | undefined {
  const normalizedQuery = normalize(query);
  if (normalizedQuery.length < 3) return undefined;
  const queryLooksSpecificAndCausal = /\b(cura|curan|controla|controlan|causa|causan|provoca|provocan|elimina|eliminan)\b/.test(normalizedQuery);

  const signalScores = feedDictionary.map((signal) => {
    const score = [signal.phrase, ...signal.aliases].map(normalize).reduce((best, alias) => {
      if (normalizedQuery === alias) return Math.max(best, 120);
      const aliasWords = alias.split(" ").filter(Boolean);
      if (normalizedQuery.includes(alias) || alias.includes(normalizedQuery)) {
        return Math.max(best, aliasWords.length > 1 ? 90 : 20);
      }
      return Math.max(best, alias.split(" ").filter((word) => word.length > 3 && normalizedQuery.includes(word)).length * 16);
    }, 0);
    return { slug: signal.topicSlug, score };
  });

  const topicScores = topics.map((topic) => {
    const title = normalize(topic.title);
    const haystack = normalize([topic.title, topic.category, topic.summary, topic.whyTrending, ...topic.relatedConcepts].join(" "));
    const queryWords = new Set(normalizedQuery.split(" ").filter((word) => word.length > 4));
    const topicWords = new Set(haystack.split(" ").filter((word) => word.length > 4));
    const distinctiveTitleMatch = title
      .split(" ")
      .some((word) => word.length >= 7 && queryWords.has(word));
    const overlap = [...queryWords].filter((word) => topicWords.has(word)).length;
    const lowOverlapSpecificClaim = queryLooksSpecificAndCausal && queryWords.size >= 3 && overlap <= 1;
    const score = normalizedQuery === title
      ? 100
      : title.includes(normalizedQuery) || normalizedQuery.includes(title)
        ? (lowOverlapSpecificClaim ? 24 : 80)
        : distinctiveTitleMatch
          ? (lowOverlapSpecificClaim ? 24 : 60)
          : overlap * 12;
    return { slug: topic.slug, score };
  });

  const best = [...signalScores, ...topicScores].sort((a, b) => b.score - a.score)[0];
  // Two generic words are too weak a signal and can attach a claim to the
  // wrong evidence pack (for example, social media + attention -> autoestima).
  if (!best || best.score < 36) return undefined;
  return topics.find((topic) => topic.slug === best.slug);
}
