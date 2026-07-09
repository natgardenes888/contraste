import type { EvidenceLevel, Topic } from "@/data/topics";

export type AnalysisMode = "claim" | "devil" | "tiktok";
export type AnalysisEvidence = "Alta" | "Moderada" | "Baja" | "Insuficiente";

export type LocalAnalysis = {
  resultKind?: "curated" | "research-map" | "unresolved";
  claim: string;
  summary: string;
  confidence: number;
  evidenceQuality: AnalysisEvidence;
  argumentsFor: Array<{ title: string; explanation: string; evidence: AnalysisEvidence }>;
  argumentsAgainst: Array<{ title: string; explanation: string; evidence: AnalysisEvidence }>;
  known: string[];
  unknown: string[];
  biases: Array<{ name: string; explanation: string }>;
  questions: string[];
  sources: Array<{
    title: string;
    publisher: string;
    year: number;
    url: string;
    authors?: string;
    summary?: string;
    citations?: number;
  }>;
};

const stopWords = new Set([
  "para", "porque", "como", "pero", "desde", "hasta", "entre", "sobre", "esto", "esta",
  "este", "estos", "estas", "todo", "todos", "todas", "algo", "mucho", "poco", "puede",
  "pueden", "tiene", "tienen", "hacer", "hace", "ser", "son", "que", "con", "sin", "por",
  "del", "las", "los", "una", "uno", "unos", "unas", "mas", "menos", "muy", "realmente",
  "crees", "piensas", "explica", "analiza", "dime", "verdad"
]);

export function buildTopicAnalysis(topic: Topic, query: string, mode: AnalysisMode): LocalAnalysis {
  const resources = [...topic.support, ...topic.opposition]
    .flatMap((argument) => argument.resources)
    .filter((resource, index, all) => all.findIndex((candidate) => candidate.url === resource.url) === index);
  const evidence = strongestEvidence(topic);

  return {
    resultKind: "curated",
    claim: query.trim(),
    summary: topicSummary(topic, mode),
    confidence: confidenceFromEvidence(evidence),
    evidenceQuality: evidenceLabel(evidence),
    argumentsFor: topic.support.slice(0, 3).map((argument) => ({
      title: argument.title,
      explanation: conciseArgument(argument.explanation, argument.limitations),
      evidence: evidenceLabel(argument.evidence)
    })),
    argumentsAgainst: topic.opposition.slice(0, 3).map((argument) => ({
      title: mode === "devil" ? `Objecion fuerte: ${argument.title}` : argument.title,
      explanation: conciseArgument(argument.explanation, argument.limitations),
      evidence: evidenceLabel(argument.evidence)
    })),
    known: unique(topic.known).slice(0, 5),
    unknown: unique(topic.unknown).slice(0, 5),
    biases: unique(topic.biases).slice(0, 4).map((name) => ({
      name,
      explanation: biasExplanation(name, topic.title)
    })),
    questions: modeQuestions(mode, topic.title.toLowerCase(), query),
    sources: resources.slice(0, 8).map((resource) => ({
      title: resource.title,
      publisher: resource.journal,
      year: resource.year,
      url: resource.url,
      authors: resource.authors,
      summary: resource.summary
    }))
  };
}

export function buildAdaptiveAnalysis(query: string, mode: AnalysisMode): LocalAnalysis {
  const claim = query.trim();
  const subject = extractSubject(claim);
  const normalized = normalize(claim);
  const causal = /\b(causa|causan|provoca|provocan|produce|destruye|mejora|empeora|aumenta|reduce|hace que)\b/.test(normalized);
  const absolute = /\b(siempre|nunca|todos|todas|nadie|ningun|ninguna|completamente|definitivamente)\b/.test(normalized);
  const normative = /\b(debe|deberia|deberian|prohibir|obligar|ilegal|permitir)\b/.test(normalized);
  const predictive = /\b(va a|futuro|reemplazara|desaparecera|inevitable|acabaran|acabaran)\b/.test(normalized);
  const numerical = /\d|%/.test(claim);
  const signals = [
    causal && "causal",
    absolute && "absoluta",
    normative && "normativa",
    predictive && "predictiva",
    numerical && "cuantitativa"
  ].filter(Boolean) as string[];

  return {
    resultKind: "unresolved",
    claim,
    summary: unresolvedSummary(mode, subject, signals),
    confidence: 0,
    evidenceQuality: "Insuficiente",
    argumentsFor: [],
    argumentsAgainst: [],
    known: [
      `La consulta trata sobre ${subject}.`,
      signals.length
        ? `La frase tiene una forma ${signals.join(", ")}. Eso ayuda a buscar evidencia, pero no demuestra la conclusion.`
        : "La frase necesita una definicion mas concreta antes de contrastarla bien."
    ],
    unknown: [
      "Que poblacion, periodo y definicion exacta deberian evaluarse.",
      "Que fuentes primarias responden directamente a la afirmacion.",
      "Si hay evidencia suficiente para hablar de causalidad, magnitud o consenso."
    ],
    biases: [],
    questions: adaptiveQuestions(mode, subject, { causal, normative, predictive, numerical }),
    sources: []
  };
}

function topicSummary(topic: Topic, mode: AnalysisMode) {
  if (mode === "devil") {
    return `Esta es la objecion mas fuerte disponible dentro de una ficha curada de CONTRASTE. ${topic.summary}`;
  }
  if (mode === "tiktok") {
    return `El contenido se ha conectado con una ficha curada. Conviene separar el gancho viral de lo que permiten sostener las fuentes. ${topic.summary}`;
  }
  return topic.summary;
}

function conciseArgument(explanation: string, limitations: string[]) {
  const clean = explanation.replace(/\s+/g, " ").trim();
  const firstLimitation = limitations.find((item) => item.trim().length > 0);
  if (!firstLimitation) return clean;
  if (clean.toLowerCase().includes(firstLimitation.toLowerCase().slice(0, 32))) return clean;
  return `${clean} Limite principal: ${firstLimitation}`;
}

function strongestEvidence(topic: Topic): EvidenceLevel {
  return topic.support[0]?.evidence ?? topic.opposition[0]?.evidence ?? "Sin evidencia suficiente";
}

function confidenceFromEvidence(evidence: EvidenceLevel) {
  if (evidence === "Alta") return 88;
  if (evidence === "Moderada") return 74;
  if (evidence === "Baja") return 56;
  return 25;
}

function unresolvedSummary(mode: AnalysisMode, subject: string, signals: string[]) {
  const shape = signals.length ? ` Parece una afirmacion ${signals.join(", ")}.` : "";
  if (mode === "devil") {
    return `No puedo construir un contraargumento documentado sobre ${subject} sin una ficha curada o fuentes claramente relacionadas.${shape} Prefiero pedir mas precision antes que rellenar huecos con una plantilla.`;
  }
  if (mode === "tiktok") {
    return `No puedo verificar este contenido con fiabilidad solo con esa frase.${shape} Se necesita identificar la afirmacion comprobable y una fuente primaria.`;
  }
  return `No puedo responder con fiabilidad sobre ${subject} con la informacion disponible.${shape} CONTRASTE no va a inventar una conclusion ni citar fuentes que no respondan directamente.`;
}

function adaptiveQuestions(
  mode: AnalysisMode,
  subject: string,
  flags: { causal: boolean; normative: boolean; predictive: boolean; numerical: boolean }
) {
  const questions = [
    `Como se definiria exactamente ${subject}?`,
    flags.causal ? "Que evidencia distinguiria causalidad de simple asociacion?" : "Que comparacion concreta permitiria evaluar la afirmacion?",
    flags.normative ? "Que costes, derechos y alternativas habria que comparar?" : flags.predictive ? "Que hecho futuro haria fallar la prediccion?" : "Que dato te haria cambiar de opinion?",
    flags.numerical ? "De donde sale la cifra, cual es el denominador y que periodo cubre?" : "Que fuente primaria seria la mas adecuada?"
  ];
  if (mode === "tiktok") questions.push("El contenido enlaza la fuente original o solo usa una captura, titular o anecdota?");
  if (mode === "devil") questions.push("Cual es la version exacta de la postura que quieres poner a prueba?");
  return unique(questions);
}

function modeQuestions(mode: AnalysisMode, topic: string, query: string) {
  const shared = [
    `Que tendria que ocurrir para cambiar de opinion sobre ${topic}?`,
    "Que evidencia se acepta en un lado que se rechazaria en el contrario?"
  ];
  if (mode === "tiktok") {
    return [...shared, "El contenido muestra la fuente completa o solo una interpretacion?", "Que informacion relevante quedo fuera?"];
  }
  if (mode === "devil") {
    return [...shared, `Que parte de "${query.slice(0, 80)}" es mas vulnerable a una excepcion?`, "Puede la posicion rival explicar los mismos hechos con menos supuestos?"];
  }
  return [...shared, "La afirmacion distingue correlacion, causa y experiencia personal?"];
}

function biasExplanation(name: string, topic: string) {
  return `${name} puede influir en como seleccionamos ejemplos sobre ${topic} y en que pruebas consideramos suficientes.`;
}

function extractSubject(query: string) {
  const terms = extractTerms(normalize(query));
  return terms.length ? terms.slice(0, 4).join(", ") : "la afirmacion";
}

function extractTerms(normalized: string) {
  return Array.from(new Set(normalized.split(" ").filter((word) => word.length > 3 && !stopWords.has(word))));
}

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9%\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function unique<T>(items: T[]) {
  return Array.from(new Set(items));
}

function evidenceLabel(evidence: EvidenceLevel): AnalysisEvidence {
  return evidence === "Sin evidencia suficiente" ? "Insuficiente" : evidence;
}
