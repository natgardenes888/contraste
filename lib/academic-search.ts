import type { AnalysisMode, LocalAnalysis } from "@/lib/local-analysis";
import { buildAdaptiveAnalysis } from "@/lib/local-analysis";

type SemanticPaper = {
  paperId: string;
  title: string;
  abstract: string | null;
  year: number | null;
  venue: string;
  authors: Array<{ name: string }>;
  citationCount: number;
  url: string;
  publicationTypes?: string[];
};

type SemanticResponse = { data?: SemanticPaper[] };

export async function buildAcademicAnalysis(query: string, mode: AnalysisMode): Promise<LocalAnalysis> {
  const base = buildAdaptiveAnalysis(query, mode);
  const papers = await searchPapers(query);
  if (!papers.length) return buildUnresolvedAnalysis(query, mode, base);

  const subject = extractSubject(query);
  const studyTypes = Array.from(new Set(papers.flatMap((paper) => paper.publicationTypes ?? []))).slice(0, 3);
  const years = papers.map((paper) => paper.year).filter((year): year is number => Boolean(year));
  const newest = years.length ? Math.max(...years) : null;
  const sourceNames = papers.slice(0, 3).map((paper) => `“${paper.title}”`);

  return {
    ...base,
    resultKind: "research-map",
    summary: modeSummary(mode, subject, papers.length, newest),
    confidence: 48,
    evidenceQuality: "Baja",
    argumentsFor: [{
      title: `Líneas de lectura relacionadas con ${subject}`,
      explanation: `La búsqueda encontró trabajos como ${sourceNames.join(", ")}. Son puntos de entrada, no pruebas concluyentes a favor. Hay que abrir cada fuente y comprobar población, método, tamaño del efecto y dirección del resultado.`,
      evidence: "Baja"
    }],
    argumentsAgainst: [{
      title: mode === "devil"
        ? `La explicación rival debe encajar mejor con los estudios encontrados`
        : mode === "tiktok"
          ? "El contenido puede omitir contexto que las publicaciones sí distinguen"
          : `La pregunta sobre ${subject} puede contener más de una afirmación`,
      explanation: buildChallenge(mode, query, papers),
      evidence: "Baja"
    }],
    known: [
      `La búsqueda académica recuperó ${papers.length} publicaciones directamente relacionadas con los términos de la consulta.`,
      newest ? `Entre los primeros resultados hay literatura publicada hasta ${newest}.` : "Los resultados incluyen literatura académica indexada.",
      studyTypes.length
        ? `Los tipos de publicación identificados incluyen: ${studyTypes.join(", ")}.`
        : "El tipo de diseño debe comprobarse en cada publicación antes de extraer conclusiones."
    ],
    unknown: [
      "Qué resultados concretos obtuvo cada estudio y si alcanzan significación práctica, no solo estadística.",
      "Si las muestras y contextos estudiados se parecen a la población implícita en la pregunta.",
      "Si existen revisiones sistemáticas, resultados nulos o publicaciones que no aparecen entre los primeros resultados."
    ],
    questions: modeQuestions(mode, subject, papers),
    sources: papers.map((paper) => ({
      title: paper.title,
      publisher: paper.venue || "Semantic Scholar",
      year: paper.year ?? 0,
      url: paper.url,
      authors: paper.authors.slice(0, 3).map((author) => author.name).join(", "),
      summary: relevantAbstractFragment(paper.abstract, query),
      citations: paper.citationCount
    }))
  };
}

async function searchPapers(query: string): Promise<SemanticPaper[]> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 7000);
  const params = new URLSearchParams({
    query: cleanSearchQuery(query),
    limit: "20",
    fields: "paperId,title,abstract,year,venue,authors,citationCount,url,publicationTypes"
  });

  try {
    const response = await fetch(`https://api.semanticscholar.org/graph/v1/paper/search?${params}`, {
      signal: controller.signal,
      headers: { "User-Agent": "CONTRASTE/0.1 academic-search" },
      next: { revalidate: 86400 }
    });
    if (!response.ok) return [];
    const payload = await response.json() as SemanticResponse;
    const papers = rankPapers((payload.data ?? []).filter((paper) => paper.title && paper.url), query);
    return papers;
  } catch {
    return [];
  } finally {
    clearTimeout(timeout);
  }
}

function buildUnresolvedAnalysis(query: string, mode: AnalysisMode, base: LocalAnalysis): LocalAnalysis {
  const message = mode === "devil"
    ? "No puedo construir un contraargumento documentado para esta afirmación."
    : mode === "tiktok"
      ? "No puedo verificar este contenido con fiabilidad."
      : "No puedo responder esta pregunta con fiabilidad.";

  return {
    ...base,
    resultKind: "unresolved",
    summary: `${message} No existe una ficha editorial revisada y la búsqueda académica no encontró publicaciones con una relación suficientemente precisa. Prefiero detenerme antes que completar los huecos con argumentos o citas dudosas.`,
    confidence: 0,
    evidenceQuality: "Insuficiente",
    argumentsFor: [],
    argumentsAgainst: [],
    known: [
      `La consulta recibida es: “${query.trim()}”.`,
      "Ningún resultado superó el umbral mínimo de relevancia de CONTRASTE."
    ],
    unknown: [
      "Qué definición concreta, población y periodo debería estudiar la búsqueda.",
      "Qué fuentes primarias responderían directamente la afirmación.",
      "Si existe evidencia suficiente para sostener o rechazar la idea."
    ],
    biases: [],
    questions: unresolvedQuestions(mode, query),
    sources: []
  };
}

function unresolvedQuestions(mode: AnalysisMode, query: string) {
  const questions = [
    "¿Puedes formular la idea con un sujeto, un efecto y una población concretos?",
    "¿La pregunta trata de un hecho medible, una predicción o una preferencia moral?"
  ];
  if (mode === "devil") questions.push("¿Qué postura exacta quieres someter a la mejor objeción posible?");
  if (mode === "tiktok") questions.push("¿Cuál es la afirmación comprobable del contenido, separada de su opinión o tono?");
  if (mode === "claim") questions.push(`¿Qué parte de “${query.slice(0, 90)}” debería verificarse primero?`);
  return questions;
}

function rankPapers(papers: SemanticPaper[], query: string) {
  const terms = queryTerms(query);
  if (terms.length < 2) return [];
  const primaryTerm = terms[0];
  const ranked = papers
    .map((paper) => {
      const title = normalizeSearchText(paper.title);
      const abstract = normalizeSearchText(paper.abstract ?? "");
      const titleOverlap = terms.filter((term) => title.includes(term)).length;
      const abstractOverlap = terms.filter((term) => abstract.includes(term)).length;
      const primaryMatch = Boolean(primaryTerm && (title.includes(primaryTerm) || abstract.includes(primaryTerm)));
      const coverage = terms.length ? (titleOverlap + abstractOverlap) / terms.length : 0;
      const score = titleOverlap * 4 + abstractOverlap + coverage;
      return { paper, primaryMatch, titleOverlap, abstractOverlap, score };
    })
    .sort((a, b) => b.score - a.score || b.paper.citationCount - a.paper.citationCount);

  const seen = new Set<string>();
  return ranked
    .filter((entry) =>
      entry.primaryMatch &&
      (entry.titleOverlap >= 2 || (entry.titleOverlap >= 1 && entry.abstractOverlap >= 3) || entry.abstractOverlap >= 5)
    )
    .filter((entry) => {
      const key = normalizeSearchText(entry.paper.title);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, 5)
    .map((entry) => entry.paper);
}

const searchStopWords = new Set([
  "este", "esta", "estos", "estas", "todos", "todas", "sobre", "porque", "realmente",
  "mejora", "mejoran", "empeora", "empeoran", "causa", "causan", "provoca", "provocan",
  "elimina", "eliminan", "reduce", "reducen", "aumenta", "aumentan", "afecta", "afectan",
  "bueno", "buena", "malo", "mala", "cierto", "cierta", "puede", "pueden", "deberia",
  "tener", "tiene", "hacer", "hacen", "treinta", "dias", "suplemento", "producto"
]);

function queryTerms(query: string) {
  return Array.from(new Set(
    normalizeSearchText(cleanSearchQuery(query))
      .split(" ")
      .filter((word) => word.length > 4 && !searchStopWords.has(word))
  ));
}

function normalizeSearchText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanSearchQuery(query: string) {
  return query
    .replace(/[¿?¡!]/g, " ")
    .replace(/\b(crees|piensas|verdad|realmente|analiza|explica|dime|por que|es cierto que)\b/gi, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 240);
}

function extractSubject(query: string) {
  const words = cleanSearchQuery(query).split(" ").filter((word) => word.length > 3);
  return words.slice(0, 6).join(" ").toLowerCase() || "la idea planteada";
}

function relevantAbstractFragment(abstract: string | null, query: string) {
  if (!abstract) return "La publicación está indexada, pero no ofrece resumen abierto en este resultado.";
  const terms = cleanSearchQuery(query).toLowerCase().split(" ").filter((word) => word.length > 4);
  const matches = terms.filter((term) => abstract.toLowerCase().includes(term)).slice(0, 6);
  return matches.length
    ? `El resumen indexado trata conceptos de la consulta: ${matches.join(", ")}. Abre la publicación para comprobar método y resultados.`
    : "El resultado coincide por relevancia académica; abre la publicación para comprobar método y resultados.";
}

function modeSummary(mode: AnalysisMode, subject: string, count: number, newest: number | null) {
  const recency = newest ? `, con resultados publicados hasta ${newest}` : "";
  if (mode === "devil") {
    return `Para poner a prueba la postura sobre ${subject}, CONTRASTE localizó ${count} publicaciones relevantes${recency}. El contraargumento se construye comparando la afirmación con lo que esos estudios midieron realmente, no repitiendo una objeción prefabricada.`;
  }
  if (mode === "tiktok") {
    return `El mensaje sobre ${subject} se ha contrastado con ${count} publicaciones académicas${recency}. La revisión separa lo que afirma el contenido de lo que las fuentes encontradas permiten sostener.`;
  }
  return `La pregunta sobre ${subject} se ha conectado con ${count} publicaciones académicas${recency}. Los resultados son específicos de esta búsqueda; deben leerse como mapa de evidencia, no como una conclusión automática.`;
}

function buildChallenge(mode: AnalysisMode, query: string, papers: SemanticPaper[]) {
  const highest = [...papers].sort((a, b) => b.citationCount - a.citationCount)[0];
  const source = highest ? ` El trabajo más citado entre estos resultados es “${highest.title}”, con ${highest.citationCount} citas registradas.` : "";
  if (mode === "devil") return `Una objeción fuerte debe identificar qué variable, grupo o periodo contradice “${query.slice(0, 120)}”.${source} El número de citas orienta sobre influencia, no garantiza que el resultado sea correcto ni aplicable al caso.`;
  if (mode === "tiktok") return `Antes de aceptar el mensaje hay que comprobar si el vídeo describe muestras, comparación, periodo y límites.${source} Un titular o una captura no permite reconstruir esas condiciones.`;
  return `La formulación mezcla posiblemente mecanismo, magnitud y generalización. Los estudios recuperados pueden medir solo una parte.${source} No puede inferirse causalidad directamente sin revisar sus diseños.`;
}

function modeQuestions(mode: AnalysisMode, subject: string, papers: SemanticPaper[]) {
  const firstTitle = papers[0]?.title;
  const questions = [
    `¿La población estudiada en “${firstTitle}” coincide con la población de tu pregunta?`,
    `¿Qué resultado observable permitiría refutar la afirmación sobre ${subject}?`,
    "¿Los trabajos encontrados miden causalidad, asociación o solamente experiencias declaradas?"
  ];
  if (mode === "devil") questions.push("¿Qué hallazgo aceptaría la postura original como una objeción válida?");
  if (mode === "tiktok") questions.push("¿El contenido enlaza alguno de estos trabajos o usa una fuente secundaria?");
  return questions;
}
