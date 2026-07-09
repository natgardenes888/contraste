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
  "del", "las", "los", "una", "uno", "unos", "unas", "más", "menos", "muy", "realmente"
]);

export function buildTopicAnalysis(topic: Topic, query: string, mode: AnalysisMode): LocalAnalysis {
  const resources = [...topic.support, ...topic.opposition]
    .flatMap((argument) => argument.resources)
    .filter((resource, index, all) => all.findIndex((candidate) => candidate.url === resource.url) === index);
  const evidence = topic.support[0]?.evidence ?? "Sin evidencia suficiente";
  const opposition = topic.opposition.map((argument) => ({
    title: mode === "devil" ? `Objeción fuerte: ${argument.title}` : argument.title,
    explanation: `${argument.explanation} Una limitación importante es: ${argument.limitations.join(" ")}`,
    evidence: evidenceLabel(argument.evidence)
  }));

  return {
    resultKind: "curated",
    claim: query.trim(),
    summary: mode === "devil"
      ? `La postura se somete a su versión contraria más sólida. ${topic.summary}`
      : mode === "tiktok"
        ? `La afirmación del contenido conecta con una ficha investigada. Conviene separar el mensaje viral de lo que sostienen las fuentes. ${topic.summary}`
        : topic.summary,
    confidence: evidence === "Alta" ? 88 : evidence === "Moderada" ? 74 : evidence === "Baja" ? 56 : 35,
    evidenceQuality: evidenceLabel(evidence),
    argumentsFor: topic.support.map((argument) => ({
      title: argument.title,
      explanation: `${argument.explanation} Una limitación importante es: ${argument.limitations.join(" ")}`,
      evidence: evidenceLabel(argument.evidence)
    })),
    argumentsAgainst: opposition,
    known: topic.known,
    unknown: topic.unknown,
    biases: topic.biases.map((name) => ({
      name,
      explanation: biasExplanation(name, query)
    })),
    questions: modeQuestions(mode, topic.title.toLowerCase(), query),
    sources: resources.map((resource) => ({
      title: resource.title,
      publisher: resource.journal,
      year: resource.year,
      url: resource.url
    }))
  };
}

export function buildAdaptiveAnalysis(query: string, mode: AnalysisMode): LocalAnalysis {
  const claim = query.trim();
  const normalized = normalize(claim);
  const terms = extractTerms(normalized);
  const subject = terms.length ? terms.slice(0, 3).join(", ") : "la afirmación";
  const causal = /\b(causa|causan|provoca|provocan|produce|destruye|mejora|empeora|aumenta|reduce|hace que)\b/.test(normalized);
  const absolute = /\b(siempre|nunca|todos|todas|nadie|ningun|ninguna|completamente|definitivamente)\b/.test(normalized);
  const normative = /\b(debe|deberia|deberían|prohibir|obligar|ilegal|permitir)\b/.test(normalized);
  const predictive = /\b(va a|acabará|futuro|reemplazará|desaparecerá|inevitable)\b/.test(normalized);
  const commercial = /\b(compra|comprar|vende|curso|suplemento|producto|milagro|dinero)\b/.test(normalized);
  const emotional = /\b(estafa|terrible|horrible|increible|peligroso|culpa|enemigo|fracaso)\b/.test(normalized);
  const numerical = /\d|%/.test(claim);

  const signals = [
    causal && "causal",
    absolute && "absoluta",
    normative && "normativa",
    predictive && "predictiva",
    commercial && "comercial",
    emotional && "emocional",
    numerical && "cuantitativa"
  ].filter(Boolean) as string[];

  const core = signals.length
    ? `La frase combina una afirmación ${signals.join(", ")} sobre ${subject}.`
    : `La frase propone una interpretación sobre ${subject}.`;

  const modeSummary = mode === "devil"
    ? `${core} Para construir el mejor contraargumento hay que buscar excepciones, costes ocultos y una explicación alternativa que encaje con los mismos hechos.`
    : mode === "tiktok"
      ? `${core} En contenido breve, la fuerza persuasiva puede venir del montaje, el tono o una anécdota; ninguna de esas señales sustituye evidencia representativa.`
      : `${core} Todavía no existe una ficha editorial específica, así que el resultado distingue hipótesis, supuestos y pruebas necesarias sin inventar fuentes.`;

  return {
    claim,
    summary: modeSummary,
    confidence: 20,
    evidenceQuality: "Insuficiente",
    argumentsFor: [supportingArgument(mode, subject, causal, normative, predictive)],
    argumentsAgainst: [challengingArgument(mode, subject, causal, absolute, normative, predictive, numerical)],
    known: knownStatements(mode, subject, signals),
    unknown: unknownStatements(subject, causal, normative, predictive),
    biases: selectBiases({ absolute, emotional, commercial, predictive, numerical }, subject),
    questions: adaptiveQuestions(mode, subject, causal, normative, predictive, numerical),
    sources: []
  };
}

function supportingArgument(mode: AnalysisMode, subject: string, causal: boolean, normative: boolean, predictive: boolean) {
  if (mode === "devil") {
    return {
      title: `La postura original puede estar ignorando una excepción sobre ${subject}`,
      explanation: `Incluso si la intuición principal fuera razonable, podría dejar fuera grupos, circunstancias o consecuencias donde ocurre lo contrario. El contraargumento más fuerte necesita describir esa excepción y mostrar que no es marginal.`,
      evidence: "Insuficiente" as const
    };
  }
  if (mode === "tiktok") {
    return {
      title: `El contenido puede partir de una observación reconocible sobre ${subject}`,
      explanation: "Una experiencia concreta puede señalar una pregunta real y conectar con problemas que la audiencia reconoce. Su valor inicial es formular una hipótesis, no demostrar que sea universal.",
      evidence: "Insuficiente" as const
    };
  }
  return {
    title: causal ? `Existe una hipótesis causal comprobable sobre ${subject}` : normative ? `La propuesta puede responder a un problema real relacionado con ${subject}` : predictive ? `La predicción identifica una tendencia posible en ${subject}` : `La idea puede describir una experiencia real sobre ${subject}`,
    explanation: "La afirmación merece investigación si define qué observa, en quién ocurre y frente a qué alternativa se compara. Casos repetidos pueden justificar una hipótesis, aunque todavía no establezcan su alcance.",
    evidence: "Insuficiente" as const
  };
}

function challengingArgument(mode: AnalysisMode, subject: string, causal: boolean, absolute: boolean, normative: boolean, predictive: boolean, numerical: boolean) {
  const issue = absolute
    ? "Los términos absolutos suelen caer con una sola excepción relevante y ocultan variación entre personas o contextos."
    : causal
      ? "Que dos fenómenos aparezcan juntos no demuestra que uno cause el otro; pueden intervenir selección, confusores o causalidad inversa."
      : normative
        ? "Pasar de describir un problema a imponer una solución exige comparar derechos, costes, incentivos y alternativas menos restrictivas."
        : predictive
          ? "Una tendencia no determina un futuro: adopción, regulación, precios y comportamiento pueden cambiar la trayectoria."
          : numerical
            ? "Una cifra sin denominador, periodo, muestra y fuente verificable puede crear precisión aparente."
            : "La conclusión necesita una definición operativa y comparación con explicaciones alternativas.";

  return {
    title: mode === "devil" ? `La explicación rival sobre ${subject}` : mode === "tiktok" ? "La forma viral puede exagerar la solidez del mensaje" : `La conclusión sobre ${subject} puede exceder las pruebas`,
    explanation: `${issue} El argumento contrario debe explicar los mismos hechos con menos supuestos o predecir observaciones distintas.`,
    evidence: "Insuficiente" as const
  };
}

function knownStatements(mode: AnalysisMode, subject: string, signals: string[]) {
  return mode === "tiktok"
    ? [
        `El mensaje central trata sobre ${subject}.`,
        `La frase utiliza un encuadre ${signals.join(", ") || "interpretativo"}.`,
        "Popularidad, seguridad al hablar y número de visualizaciones no miden calidad de evidencia."
      ]
    : [
        `La afirmación se centra en ${subject}.`,
        `Su forma puede analizarse como ${signals.join(", ") || "una interpretación general"}.`,
        "Una experiencia o ejemplo permite abrir una pregunta, pero no generalizar por sí solo."
      ];
}

function unknownStatements(subject: string, causal: boolean, normative: boolean, predictive: boolean) {
  return [
    `Qué población, periodo y definición concreta se usan al hablar de ${subject}.`,
    causal ? "Si existe una relación causal o solo asociación, selección y factores de confusión." : "Qué datos comparativos respaldan la magnitud de la afirmación.",
    normative ? "Qué efectos secundarios tendría la propuesta y qué alternativas se compararon." : predictive ? "Qué condiciones tendrían que mantenerse para que la predicción se cumpla." : "Qué evidencia contradice la interpretación y cómo se respondió a ella."
  ];
}

function selectBiases(flags: { absolute: boolean; emotional: boolean; commercial: boolean; predictive: boolean; numerical: boolean }, subject: string) {
  const biases = [];
  if (flags.absolute) biases.push({ name: "Pensamiento absoluto", explanation: `Convierte la variación sobre ${subject} en una regla sin excepciones.` });
  if (flags.emotional) biases.push({ name: "Razonamiento emocional", explanation: "La intensidad de una reacción puede confundirse con la probabilidad o gravedad real." });
  if (flags.commercial) biases.push({ name: "Conflicto de interés", explanation: "Quien presenta el problema puede beneficiarse de vender la solución." });
  if (flags.predictive) biases.push({ name: "Extrapolación", explanation: "Prolonga una tendencia actual como si sus condiciones nunca fueran a cambiar." });
  if (flags.numerical) biases.push({ name: "Precisión aparente", explanation: "Una cifra concreta parece rigurosa aunque falten fuente, muestra o denominador." });
  biases.push(
    { name: "Confirmación", explanation: `Favorece ejemplos compatibles con la postura inicial sobre ${subject}.` },
    { name: "Disponibilidad", explanation: "Lo más visible o reciente puede parecer más frecuente de lo que es." }
  );
  return biases.slice(0, 4);
}

function adaptiveQuestions(mode: AnalysisMode, subject: string, causal: boolean, normative: boolean, predictive: boolean, numerical: boolean) {
  const questions = [
    `¿Cómo se definiría y mediría exactamente ${subject}?`,
    causal ? "¿Qué diseño permitiría distinguir causalidad de correlación?" : "¿Qué comparación falta para evaluar esta afirmación?",
    normative ? "¿Qué alternativa menos restrictiva podría lograr el mismo objetivo?" : predictive ? "¿Qué acontecimiento haría fallar esta predicción?" : "¿Qué evidencia te haría cambiar de opinión?",
    numerical ? "¿De dónde sale la cifra, cuál es el denominador y qué periodo cubre?" : "¿Existe una explicación alternativa para los mismos casos?"
  ];
  if (mode === "tiktok") questions.push("¿El contenido enlaza la fuente original o solo cita una captura, titular o experto?");
  if (mode === "devil") questions.push("¿Cuál es la versión del argumento contrario que aceptarían sus mejores defensores?");
  return questions;
}

function modeQuestions(mode: AnalysisMode, topic: string, query: string) {
  const shared = [
    `¿Qué tendría que ocurrir para cambiar de opinión sobre ${topic}?`,
    "¿Qué evidencia se acepta en un lado que se rechazaría en el contrario?"
  ];
  if (mode === "tiktok") return [...shared, "¿El contenido muestra la fuente completa o solo una interpretación?", "¿Qué información relevante quedó fuera del vídeo?"];
  if (mode === "devil") return [...shared, `¿Qué parte de “${query.slice(0, 80)}” es más vulnerable a una excepción?`, "¿Puede la posición rival explicar los mismos hechos con menos supuestos?"];
  return [...shared, "¿La afirmación distingue correlación, causa y experiencia personal?"];
}

function biasExplanation(name: string, query: string) {
  return `${name} puede influir en cómo seleccionamos ejemplos e interpretamos “${query.slice(0, 90)}”.`;
}

function extractTerms(normalized: string) {
  return Array.from(new Set(normalized.split(" ").filter((word) => word.length > 3 && !stopWords.has(word))));
}

function normalize(value: string) {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9%áéíóúñ\s]/g, " ").replace(/\s+/g, " ").trim();
}

function evidenceLabel(evidence: EvidenceLevel): AnalysisEvidence {
  return evidence === "Sin evidencia suficiente" ? "Insuficiente" : evidence;
}
