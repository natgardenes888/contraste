import {
  Brain,
  BriefcaseBusiness,
  Cpu,
  GraduationCap,
  HeartHandshake,
  Leaf,
  Scale,
  Sparkles
} from "lucide-react";
import { validateTopics } from "@/data/validate-topics";

export type EvidenceLevel = "Alta" | "Moderada" | "Baja" | "Sin evidencia suficiente";
export type StudyType = "Metaanalisis" | "Revision sistematica" | "Ensayo clinico" | "Longitudinal" | "Observacional" | "Opinion";

export type Resource = {
  title: string;
  authors: string;
  year: number;
  journal: string;
  studyType: StudyType;
  participants: string;
  summary: string;
  limitations: string;
  url: string;
  type?: StudyType;
  source?: string;
  level?: "Basico" | "Intermedio" | "Universitario" | "Experto";
};

export type Argument = {
  id?: string;
  title: string;
  summary?: string;
  evidence: EvidenceLevel;
  consensus: "Alto" | "Medio" | "Bajo" | "Disputado";
  explanation: string;
  strengths: string[];
  limitations: string[];
  counterarguments: string[];
  relatedConcepts: string[];
  resources: Resource[];
  questions?: string[];
};

export type Topic = {
  id?: string;
  slug: string;
  title: string;
  category: string;
  description?: string;
  summary: string;
  whyTrending: string;
  status: string;
  updatedAt: string;
  support: Argument[];
  opposition: Argument[];
  known: string[];
  unknown: string[];
  biases: string[];
  resourcesByLevel: Record<"Basico" | "Intermedio" | "Universitario" | "Experto", string[]>;
  relatedConcepts: string[];
  proArguments?: Argument[];
  conArguments?: Argument[];
  whatWeKnow?: string[];
  whatWeDontKnow?: string[];
  resources?: Resource[];
};

export type StructuredResource = Resource & Required<Pick<Resource, "type" | "source" | "level">>;
export type StructuredArgument = Omit<Argument, "id" | "summary" | "questions" | "resources"> & {
  id: string;
  summary: string;
  questions: string[];
  resources: StructuredResource[];
};
export type StructuredTopic = Omit<
  Topic,
  "id" | "description" | "support" | "opposition" | "proArguments" | "conArguments" | "whatWeKnow" | "whatWeDontKnow" | "resources"
> & {
  id: string;
  description: string;
  support: StructuredArgument[];
  opposition: StructuredArgument[];
  proArguments: StructuredArgument[];
  conArguments: StructuredArgument[];
  whatWeKnow: string[];
  whatWeDontKnow: string[];
  resources: StructuredResource[];
};

export const categories = [
  { name: "Psicologia", icon: Brain },
  { name: "Relaciones", icon: HeartHandshake },
  { name: "Nutricion", icon: Leaf },
  { name: "Salud", icon: Sparkles },
  { name: "Ciencia", icon: GraduationCap },
  { name: "Tecnologia", icon: Cpu },
  { name: "IA", icon: Cpu },
  { name: "Filosofia", icon: Scale },
  { name: "Politica", icon: BriefcaseBusiness },
  { name: "Economia", icon: BriefcaseBusiness },
  { name: "Historia", icon: GraduationCap },
  { name: "Sociedad", icon: HeartHandshake },
  { name: "Educacion", icon: GraduationCap },
  { name: "Medio ambiente", icon: Leaf },
  { name: "Cultura", icon: Sparkles },
  { name: "Espiritualidad", icon: Sparkles }
];

const sourceHub: Resource = {
  title: "Structured evidence dossier",
  authors: "Equipo editorial CONTRASTE",
  year: 2026,
  journal: "Base de conocimiento interna",
  studyType: "Revision sistematica",
  participants: "Sintesis de fuentes academicas, institucionales y divulgativas",
  summary:
    "Ficha semilla preparada para conectar estudios revisados, autores, conceptos, argumentos y contraargumentos sin depender de una respuesta generada en caliente.",
  limitations:
    "Debe ser ampliada con fuentes verificadas antes de presentarse como ficha editorial cerrada.",
  url: "https://scholar.google.com"
};

function makeArgument(topic: string, angle: "support" | "opposition", evidence: EvidenceLevel): Argument {
  const isSupport = angle === "support";

  return {
    id: `${angle}-${topic.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    title: isSupport ? "Tiene mecanismos plausibles y beneficios observables" : "Puede ocultar costes, sesgos o efectos secundarios",
    summary: isSupport ? "La mejor defensa disponible de esta idea." : "La objecion mas importante que conviene examinar.",
    evidence,
    consensus: evidence === "Alta" ? "Alto" : evidence === "Moderada" ? "Medio" : "Disputado",
    explanation: isSupport
      ? `${topic} tiene argumentos solidos cuando se define con precision, se separan los casos extremos de los casos comunes y se revisa la calidad de la evidencia disponible.`
      : `${topic} tambien exige cautela: una parte del debate suele mezclar intuiciones, incentivos, valores morales y datos de calidad desigual.`,
    strengths: isSupport
      ? ["Permite distinguir matices en vez de caer en posiciones binarias", "Conecta evidencias con decisiones practicas"]
      : ["Identifica limites reales de la evidencia", "Evita convertir correlaciones en certezas"],
    limitations: isSupport
      ? ["Puede depender del contexto cultural y economico", "Algunas fuentes no miden resultados a largo plazo"]
      : ["El riesgo no siempre implica dano probable", "La ausencia de evidencia fuerte no equivale a evidencia de ausencia"],
    counterarguments: isSupport
      ? ["Los beneficios pueden concentrarse en grupos concretos", "La aplicacion practica puede ser peor que la teoria"]
      : ["Algunos costes se reducen con buena regulacion, diseno o educacion", "El rechazo total puede impedir mejoras utiles"],
    relatedConcepts: ["Causalidad", "Incentivos", "Consenso", "Riesgo"],
    resources: [sourceHub],
    questions: [
      "Que evidencia haria cambiar esta conclusion?",
      "A que poblaciones y contextos puede generalizarse?"
    ]
  };
}

function createTopic({
  slug,
  title,
  category,
  summary,
  whyTrending,
  concepts,
  evidence = "Moderada"
}: {
  slug: string;
  title: string;
  category: string;
  summary: string;
  whyTrending: string;
  concepts: string[];
  evidence?: EvidenceLevel;
}): Topic {
  return {
    id: slug,
    slug,
    title,
    category,
    description: summary,
    summary,
    whyTrending,
    status: "Ficha semilla lista para revision editorial",
    updatedAt: "2026-07-08",
    support: [makeArgument(title, "support", evidence)],
    opposition: [makeArgument(title, "opposition", evidence === "Alta" ? "Moderada" : "Baja")],
    known: [
      "La pregunta mejora cuando se define el alcance exacto del tema.",
      "La calidad de evidencia varia segun metodos, muestras, incentivos y horizonte temporal.",
      "Las mejores respuestas suelen combinar datos, valores y consecuencias practicas."
    ],
    unknown: [
      "Que efectos aparecen en poblaciones distintas a las mas estudiadas.",
      "Como cambian las conclusiones cuando se incorporan datos recientes.",
      "Que intervenciones concretas funcionan mejor y para quien."
    ],
    biases: ["Confirmacion", "Disponibilidad", "Falso dilema", "Efecto autoridad"],
    resourcesByLevel: {
      Basico: [`Introduccion clara a ${title}`],
      Intermedio: [`Debates actuales y posiciones principales sobre ${title}`],
      Universitario: [`Lecturas metodologicas para evaluar evidencia en ${category}`],
      Experto: [`Revisiones, metaanalisis y documentos tecnicos sobre ${title}`]
    },
    relatedConcepts: concepts
  };
}

const detailedTopics: Topic[] = [
  createTopic({
    slug: "pornografia-y-relaciones",
    title: "Pornografia y relaciones",
    category: "Relaciones",
    summary:
      "El impacto de la pornografia en las relaciones depende de frecuencia, contexto, acuerdos de pareja, edad de inicio, tipo de contenido y vulnerabilidades previas.",
    whyTrending:
      "Cruza salud mental, educacion sexual, algoritmos de recomendacion, consentimiento y expectativas sobre intimidad.",
    concepts: ["Consentimiento", "Deseo", "Apego", "Guiones sexuales", "Educacion sexual"],
    evidence: "Moderada"
  }),
  createTopic({
    slug: "ia-generativa-en-educacion",
    title: "IA generativa en educacion",
    category: "IA",
    summary:
      "La IA generativa puede ampliar el acceso a tutoria personalizada, pero introduce riesgos de dependencia, evaluacion superficial, sesgos y desigualdad de acceso.",
    whyTrending:
      "Escuelas y universidades redisenan tareas, examenes y politicas mientras estudiantes ya usan asistentes de IA a diario.",
    concepts: ["Metacognicion", "Evaluacion autentica", "Privacidad", "Sesgos algoritmicos"],
    evidence: "Alta"
  })
];

const catalogSeeds = [
  ["redes-sociales-y-autoestima", "Redes sociales y autoestima", "Psicologia", "Las plataformas sociales pueden facilitar conexion y expresion, pero tambien intensificar comparacion social, ansiedad e imagen corporal.", "El tiempo de uso, los filtros, los algoritmos y la economia de la atencion han convertido el tema en una preocupacion familiar, educativa y clinica.", ["Comparacion social", "Identidad", "Atencion", "Imagen corporal"]],
  ["ayuno-intermitente", "Ayuno intermitente", "Nutricion", "El ayuno intermitente puede ayudar a algunas personas a ordenar ingesta y peso, pero no es magicamente superior a otros patrones cuando las calorias y adherencia son similares.", "Se popularizo por promesas simples, rutinas virales y debates sobre metabolismo, longevidad y control de peso.", ["Adherencia", "Deficit calorico", "Metabolismo", "Conducta alimentaria"]],
  ["microbiota-y-salud-mental", "Microbiota y salud mental", "Salud", "La relacion intestino-cerebro es prometedora, pero todavia es facil exagerar causalidades y vender soluciones antes de tener evidencia clinica fuerte.", "Probióticos, dieta y salud mental aparecen constantemente en redes, podcasts y publicidad de bienestar.", ["Eje intestino-cerebro", "Inflamacion", "Placebo", "Ensayo clinico"]],
  ["energia-nuclear", "Energia nuclear", "Ciencia", "La energia nuclear ofrece electricidad baja en carbono y estable, pero plantea debates sobre coste, residuos, seguridad y tiempos de construccion.", "El cambio climatico y la seguridad energetica han reabierto un debate que muchos paises habian dado por cerrado.", ["Riesgo", "Descarbonizacion", "Residuos", "Coste nivelado"]],
  ["coches-electricos", "Coches electricos", "Tecnologia", "Los coches electricos reducen emisiones de uso local y pueden bajar emisiones totales, aunque dependen de bateria, red electrica, mineria y patrones de movilidad.", "Gobiernos, fabricantes y consumidores discuten precios, autonomia, puntos de carga y regulacion.", ["Ciclo de vida", "Baterias", "Infraestructura", "Transicion energetica"]],
  ["libertad-de-expresion-y-desinformacion", "Libertad de expresion y desinformacion", "Politica", "Proteger la expresion y reducir dano informativo son objetivos valiosos que chocan cuando plataformas, estados y audiencias tienen incentivos distintos.", "Elecciones, conflictos y redes sociales han puesto la moderacion de contenido en el centro del debate democratico.", ["Censura", "Pluralismo", "Moderacion", "Propaganda"]],
  ["renta-basica-universal", "Renta basica universal", "Economia", "La renta basica promete seguridad economica y simplificacion administrativa, pero su coste, efectos laborales y diseno fiscal siguen abiertos.", "Automatizacion, precariedad y desigualdad han hecho que la idea vuelva a la conversacion publica.", ["Redistribucion", "Incentivos", "Fiscalidad", "Bienestar"]],
  ["colonialismo-y-memoria-historica", "Colonialismo y memoria historica", "Historia", "La memoria colonial combina hechos historicos, identidad, reparacion, patrimonio y disputas sobre como narrar el pasado.", "Museos, escuelas, monumentos y debates politicos estan revisando relatos que antes parecian estables.", ["Memoria", "Reparacion", "Archivo", "Identidad"]],
  ["masculinidad-contemporanea", "Masculinidad contemporanea", "Sociedad", "Los debates sobre masculinidad mezclan salud mental, relaciones, violencia, rol laboral, soledad y nuevas expectativas culturales.", "Influencers, educadores y movimientos sociales compiten por definir que significa ser hombre hoy.", ["Genero", "Soledad", "Normas sociales", "Identidad"]],
  ["deberes-escolares", "Deberes escolares", "Educacion", "Los deberes pueden reforzar aprendizaje si son breves y bien disenados, pero tambien amplifican desigualdad y fatiga cuando sustituyen mala planificacion.", "Familias y centros educativos discuten carga, autonomia, rendimiento y bienestar infantil.", ["Aprendizaje", "Desigualdad", "Motivacion", "Carga cognitiva"]],
  ["cambio-climatico-y-responsabilidad-individual", "Cambio climatico y responsabilidad individual", "Medio ambiente", "La accion individual importa, pero su impacto depende de sistemas energeticos, regulacion, empresas e infraestructura disponible.", "El debate oscila entre culpa individual y cambios estructurales, a menudo como si fueran excluyentes.", ["Huella de carbono", "Accion colectiva", "Regulacion", "Consumo"]],
  ["apropiacion-cultural", "Apropiacion cultural", "Cultura", "La apropiacion cultural exige distinguir intercambio, homenaje, comercio, poder historico y dano a comunidades de origen.", "Moda, musica, gastronomia y redes sociales vuelven visible cada conflicto en tiempo real.", ["Poder", "Identidad", "Reconocimiento", "Mercantilizacion"]],
  ["mindfulness-y-espiritualidad", "Mindfulness y espiritualidad", "Espiritualidad", "El mindfulness puede ayudar con atencion y regulacion emocional, pero sus beneficios dependen de practica, contexto y expectativas realistas.", "Empresas, clinicas, escuelas y apps lo han convertido en herramienta de bienestar masiva.", ["Atencion", "Regulacion emocional", "Secularizacion", "Placebo"]],
  ["poliamor-y-monogamia", "Poliamor y monogamia", "Relaciones", "Las estructuras relacionales no se explican solo por etiquetas; importan acuerdos, apego, comunicacion, celos y contexto cultural.", "Nuevos modelos de pareja se discuten abiertamente en redes, terapia y cultura popular.", ["Apego", "Celos", "Acuerdos", "Normas sociales"]],
  ["vacunas-y-confianza-publica", "Vacunas y confianza publica", "Salud", "Las vacunas tienen una base historica fuerte, pero la confianza publica depende de transparencia, comunicacion de riesgos y experiencias institucionales.", "La pandemia intensifico la polarizacion sobre salud publica, libertad individual y autoridad cientifica.", ["Riesgo relativo", "Salud publica", "Confianza", "Transparencia"]],
  ["meritocracia", "Meritocracia", "Filosofia", "La meritocracia reconoce esfuerzo y talento, pero puede invisibilizar suerte, herencia, redes y desigualdades de partida.", "Es una idea central para educacion, trabajo, politica fiscal y debates sobre justicia.", ["Justicia", "Suerte moral", "Igualdad de oportunidades", "Movilidad social"]],
  ["trabajo-remoto", "Trabajo remoto", "Economia", "El trabajo remoto puede mejorar flexibilidad y concentracion, pero afecta colaboracion, carrera, ciudades y limites entre vida y empleo.", "Despues de la pandemia, empresas y trabajadores renegocian donde, como y para que se trabaja presencialmente.", ["Productividad", "Confianza", "Ciudad", "Cultura organizacional"]],
  ["deepfakes-y-confianza", "Deepfakes y confianza", "Tecnologia", "Los deepfakes crean oportunidades creativas y riesgos de fraude, acoso, propaganda y erosion de confianza visual.", "La mejora de modelos generativos hace que la autenticidad de imagen, voz y video sea una pregunta cotidiana.", ["Autenticidad", "Identidad", "Fraude", "Verificacion"]]
  ,
  ["ayuno-de-dopamina", "Ayuno de dopamina", "Psicologia", "El ayuno de dopamina suele mezclar estrategias utiles de autocontrol con explicaciones simplificadas sobre el cerebro y la motivacion.", "Se hizo viral como respuesta al cansancio digital, la sobreestimulacion y la busqueda de productividad extrema.", ["Dopamina", "Habitos", "Autocontrol", "Atencion"]],
  ["trad-wives", "Trad Wives", "Sociedad", "El fenomeno trad wife combina estetica domestica, critica a la modernidad, identidad de genero, economia familiar e influencia digital.", "Se viralizo porque convierte decisiones privadas sobre pareja y hogar en una batalla cultural sobre feminismo, libertad y nostalgia.", ["Genero", "Trabajo domestico", "Nostalgia", "Influencers"]],
  ["feminismo-4b", "Feminismo 4B", "Politica", "El movimiento 4B propone rechazar citas, matrimonio, sexo y maternidad con hombres como respuesta radical a desigualdades de genero.", "Ha saltado de Corea del Sur a conversaciones globales por redes sociales, polarizacion politica y debates sobre autonomia femenina.", ["Feminismo", "Autonomia", "Polarizacion", "Genero"]],
  ["ia-reemplazara-empleos", "IA reemplazara empleos", "IA", "La IA automatizara tareas y transformara empleos, pero el resultado neto depende de adopcion, regulacion, productividad y nuevas ocupaciones.", "La llegada de modelos generativos hizo tangible una preocupacion laboral que antes parecia lejana.", ["Automatizacion", "Productividad", "Trabajo", "Desigualdad"]],
  ["red-pill", "Red Pill", "Relaciones", "La Red Pill mezcla critica social, consejos de estatus, resentimiento de genero y comunidades online con afirmaciones de evidencia muy desigual.", "Su expansion en redes conecta soledad masculina, frustracion romantica, algoritmos y negocios de autoayuda extrema.", ["Masculinidad", "Estatus", "Pareja", "Comunidades online"]],
  ["estoicismo", "Estoicismo", "Filosofia", "El estoicismo moderno puede ofrecer herramientas de autocontrol y perspectiva, aunque a veces se simplifica como productividad fria o represion emocional.", "Libros, podcasts y redes lo convirtieron en una filosofia practica para ansiedad, disciplina y sentido.", ["Virtud", "Control", "Emociones", "Disciplina"]],
  ["feminismo-contemporaneo", "Feminismo contemporaneo", "Sociedad", "El feminismo agrupa corrientes distintas que analizan desigualdad, autonomia, violencia, cuidados, trabajo y representacion.", "Los debates sobre derechos, identidad, relaciones y reaccion antifeminista ocupan un lugar central en redes y politica.", ["Igualdad", "Genero", "Cuidados", "Interseccionalidad"]],
  ["apego-y-relaciones", "Apego y relaciones", "Psicologia", "La teoria del apego ayuda a pensar patrones relacionales, pero las etiquetas populares no son diagnosticos fijos ni explican por si solas una pareja.", "TikTok, terapia y contenido de citas han popularizado apego ansioso, evitativo y seguro como lenguaje cotidiano.", ["Apego seguro", "Regulacion emocional", "Intimidad", "Modelos internos"]],
  ["ghosting", "Ghosting", "Relaciones", "El ghosting describe la interrupcion unilateral de contacto sin explicacion y puede producir incertidumbre, rechazo y rumiacion.", "Las apps de citas y la comunicacion digital facilitan terminar vinculos con muy poco coste social inmediato.", ["Rechazo", "Ambiguedad", "Apps de citas", "Responsabilidad afectiva"]],
  ["dieta-carnivora", "Dieta carnivora", "Nutricion", "La dieta carnivora elimina casi todos los alimentos vegetales. Sus testimonios positivos conviven con incertidumbre sobre seguridad, fibra, micronutrientes y riesgo cardiovascular a largo plazo.", "Influencers de salud la presentan como solucion para obesidad, inflamacion, autoinmunidad y salud mental.", ["Cetosis", "Fibra", "LDL", "Adherencia"]],
  ["ozempic-y-perdida-de-peso", "Ozempic y farmacos GLP-1", "Salud", "Los agonistas GLP-1 producen perdidas de peso relevantes y beneficios metabolicos, pero requieren supervision y plantean efectos adversos, coste y recuperacion de peso al suspenderlos.", "Su eficacia, uso estetico, escasez y presencia de celebridades han convertido estos farmacos en un fenomeno cultural.", ["GLP-1", "Obesidad", "Diabetes", "Estigma"]],
  ["tdah", "TDAH", "Psicologia", "El TDAH es un trastorno del neurodesarrollo evaluado por sintomas persistentes, deterioro funcional e historia clinica; identificarse con videos no equivale a un diagnostico.", "Contenido breve sobre productividad y salud mental ha aumentado reconocimiento, autodiagnostico y debate sobre sobrediagnostico.", ["Atencion", "Funciones ejecutivas", "Diagnostico diferencial", "Tratamiento"]],
  ["ansiedad", "Ansiedad", "Salud", "La ansiedad es una respuesta humana normal que se convierte en problema clinico cuando es persistente, desproporcionada y limita la vida.", "La mayor conversacion sobre salud mental ha reducido estigma, pero tambien mezcla malestar cotidiano, diagnosticos y consejos de calidad desigual.", ["Evitacion", "Exposicion", "Regulacion emocional", "Incertidumbre"]],
  ["pantallas-y-ninos", "Pantallas y ninos", "Educacion", "Los efectos de las pantallas dependen de edad, contenido, contexto, acompanamiento, sueno y de aquello que desplazan.", "Familias y escuelas reciben mensajes alarmistas y promesas educativas mientras cambian rapidamente dispositivos y plataformas.", ["Desarrollo infantil", "Sueno", "Atencion", "Mediacion parental"]]
] as const;

const baseTopics: Topic[] = [
  ...detailedTopics,
  ...catalogSeeds.map(([slug, title, category, summary, whyTrending, concepts]) =>
    createTopic({ slug, title, category, summary, whyTrending, concepts: [...concepts] })
  )
];

const richTopics: Record<string, Partial<Topic>> = {
  "pornografia-y-relaciones": {
    title: "¿La pornografia es mala para las relaciones?",
    summary:
      "La mejor lectura no es pornografia buena o mala. La evidencia apunta a efectos distintos segun frecuencia, uso solitario o compartido, secreto, edad, contenido, acuerdos de pareja y malestar moral.",
    whyTrending:
      "En TikTok e Instagram el tema aparece mezclado con Red Pill, terapia de pareja, ansiedad sexual, NoFap, consentimiento y expectativas irreales sobre el sexo.",
    status: "Ficha editorial con evidencia correlacional fuerte pero causalidad limitada",
    support: [
      {
        title: "El uso frecuente y solitario se asocia con menor satisfaccion sexual o relacional en algunos estudios",
        evidence: "Moderada",
        consensus: "Medio",
        explanation:
          "Las revisiones encuentran asociaciones negativas, especialmente cuando el consumo es frecuente, secreto o sustituye intimidad real. El punto clave es que muchas asociaciones son pequenas y no siempre prueban causalidad: puede que la insatisfaccion lleve a consumir mas pornografia, no solo al reves.",
        strengths: ["Encaja con estudios de satisfaccion sexual y relacional", "Distingue consumo ocasional de patron problematico"],
        limitations: ["Muchos estudios son transversales", "La magnitud media del efecto suele ser pequena"],
        counterarguments: ["El dano no es universal", "El contexto de pareja y los acuerdos cambian mucho el resultado"],
        relatedConcepts: ["Causalidad inversa", "Satisfaccion sexual", "Secreto", "Malestar moral"],
        resources: [
          {
            title: "Pornography Consumption and Satisfaction: A Meta-Analysis",
            authors: "Wright, Tokunaga, Kraus, Klann",
            year: 2017,
            journal: "Human Communication Research",
            studyType: "Metaanalisis",
            participants: "Sintesis de estudios sobre consumo y satisfaccion",
            summary: "Encuentra asociaciones entre consumo de pornografia y menor satisfaccion, con efectos que dependen de dominio, genero y contexto.",
            limitations: "La evidencia incluye muchos disenos correlacionales y no permite cerrar mecanismos causales.",
            url: "https://academic.oup.com/hcr/article-abstract/43/3/315/4670781"
          },
          {
            title: "Effect of pornography use on sexual satisfaction: a systematic review and meta-analysis",
            authors: "Abdi, Pakzad, Alidost, Aghapour, Mehrnoush",
            year: 2024,
            journal: "Journal of Addictive Diseases",
            studyType: "Metaanalisis",
            participants: "Sintesis de literatura reciente",
            summary: "Revisa la relacion entre uso de pornografia y satisfaccion sexual, subrayando heterogeneidad de resultados.",
            limitations: "Los estudios incluidos varian mucho en medicion, poblacion y control de confusores.",
            url: "https://pubmed.ncbi.nlm.nih.gov/"
          }
        ]
      },
      {
        title: "Puede moldear expectativas sexuales cuando funciona como educacion sexual de facto",
        evidence: "Moderada",
        consensus: "Medio",
        explanation:
          "Si una persona aprende sobre sexo principalmente a traves de contenido pornografico, puede interiorizar guiones poco realistas sobre cuerpos, deseo, consentimiento, duracion, rendimiento o disponibilidad sexual.",
        strengths: ["Explica por que edad de inicio y alfabetizacion sexual importan", "Conecta contenido visto con expectativas aprendidas"],
        limitations: ["No todo contenido pornografico transmite los mismos guiones", "La educacion sexual critica puede moderar el efecto"],
        counterarguments: ["Muchas personas diferencian fantasia, ficcion y vida real", "El problema puede ser la falta de educacion sexual, no solo el porno"],
        relatedConcepts: ["Guiones sexuales", "Aprendizaje social", "Consentimiento"],
        resources: [
          {
            title: "The use and effects of pornography in romantic relationships",
            authors: "Campbell, Kohut",
            year: 2017,
            journal: "Current Opinion in Psychology",
            studyType: "Revision sistematica",
            participants: "Revision narrativa de estudios relacionales",
            summary: "Resume vias por las que la pornografia puede afectar relaciones: satisfaccion, acuerdos, comunicacion y expectativas.",
            limitations: "Campo con resultados mixtos y dependencia alta de autoinformes.",
            url: "https://www.sciencedirect.com/science/article/abs/pii/S2352250X16300224"
          }
        ]
      }
    ],
    opposition: [
      {
        title: "No hay evidencia suficiente para afirmar que cualquier consumo sea dañino",
        evidence: "Alta",
        consensus: "Alto",
        explanation:
          "La afirmacion viral 'el porno destruye relaciones' simplifica demasiado. Los efectos dependen del patron de consumo, de si hay secreto, de la relacion previa, de la culpa, de la cultura y de si se usa individualmente o como parte de una conversacion compartida.",
        strengths: ["Evita moralizar el tema", "Separa riesgo en subgrupos de condena universal"],
        limitations: ["No niega danos reales en usuarios problematicos", "Puede infravalorar experiencias de parejas afectadas"],
        counterarguments: ["Aunque el dano no sea universal, algunos patrones si pueden ser clinicamente relevantes"],
        relatedConcepts: ["Heterogeneidad", "Malestar moral", "Acuerdos de pareja"],
        resources: [
          {
            title: "Effects of pornography",
            authors: "Resumen enciclopedico con referencias academicas",
            year: 2026,
            journal: "Springer Nature / referencias secundarias",
            studyType: "Revision sistematica",
            participants: "Sintesis de literatura citada",
            summary: "Resume que la evidencia sobre relaciones es mixta y que muchas asociaciones no prueban causalidad.",
            limitations: "Debe usarse como punto de entrada, no como fuente primaria final.",
            url: "https://en.wikipedia.org/wiki/Effects_of_pornography"
          }
        ]
      }
    ],
    known: [
      "El patron de consumo importa mas que la etiqueta 'pornografia' en abstracto.",
      "La evidencia sobre satisfaccion relacional es mayoritariamente correlacional.",
      "Secreto, conflicto de pareja, malestar moral y uso compulsivo percibido son moderadores clave."
    ],
    unknown: [
      "Que tipos de contenido producen mas aprendizaje de expectativas irreales.",
      "Cuanto cambia el impacto con algoritmos de recomendacion cada vez mas personalizados.",
      "Que intervenciones educativas reducen riesgo sin generar culpa inutil."
    ]
  },
  "redes-sociales-y-autoestima": {
    title: "Redes sociales y autoestima",
    summary:
      "Las redes no afectan igual a todo el mundo. El riesgo aumenta cuando el uso se centra en comparacion social, imagen corporal, validacion por likes, filtros y exposicion repetida a ideales fisicos o estilos de vida inalcanzables.",
    whyTrending:
      "Instagram, TikTok y filtros de belleza han convertido la autoestima en una experiencia cuantificada: vistas, likes, cuerpos editados y vidas aparentemente perfectas.",
    status: "Ficha editorial con evidencia moderada y alta heterogeneidad",
    support: [
      {
        title: "El uso centrado en apariencia se asocia con peor imagen corporal",
        evidence: "Alta",
        consensus: "Alto",
        explanation:
          "La literatura diferencia 'usar redes' de 'usar redes para compararse'. El segundo patron, especialmente con contenido visual, filtros y cuentas de apariencia, se asocia de forma mas consistente con insatisfaccion corporal.",
        strengths: ["Distingue tiempo de uso y tipo de uso", "Encaja con mecanismos de comparacion social"],
        limitations: ["La vulnerabilidad previa puede explicar parte del efecto", "Hay diferencias por edad, genero y plataforma"],
        counterarguments: ["Comunidades de apoyo y body positivity pueden tener efectos protectores"],
        relatedConcepts: ["Comparacion social", "Imagen corporal", "Filtros", "Validacion"],
        resources: [
          {
            title: "Social media use and body image disorders: association between frequency and body dissatisfaction",
            authors: "Saiphoo, Vahedi",
            year: 2019,
            journal: "Body Image",
            studyType: "Metaanalisis",
            participants: "Sintesis de estudios sobre redes e imagen corporal",
            summary: "Encuentra relacion entre uso de redes y preocupaciones de imagen corporal, especialmente en usos centrados en apariencia.",
            limitations: "Asociaciones medias y mucha variacion entre estudios.",
            url: "https://www.sciencedirect.com/science/article/abs/pii/S1740144519302488"
          },
          {
            title: "Social Media Effects on Young Women's Body Image Concerns",
            authors: "Perloff",
            year: 2014,
            journal: "Sex Roles",
            studyType: "Revision sistematica",
            participants: "Revision teorica y agenda de investigacion",
            summary: "Propone mecanismos: comparacion social, internalizacion del ideal y autoobjetivacion.",
            limitations: "Articulo teorico; no estima un efecto causal unico.",
            url: "https://link.springer.com/article/10.1007/s11199-014-0384-6"
          }
        ]
      }
    ],
    opposition: [
      {
        title: "No todo uso de redes empeora autoestima; el contexto social importa",
        evidence: "Moderada",
        consensus: "Medio",
        explanation:
          "Mensajes privados, comunidades de apoyo, creadores educativos y grupos de pertenencia pueden ayudar a personas que se sienten aisladas. La pregunta no es redes si o no, sino que diseño, que contenido y que vulnerabilidad previa.",
        strengths: ["Evita demonizar una tecnologia entera", "Incorpora usos activos y de apoyo"],
        limitations: ["Los beneficios pueden depender de curacion activa del feed", "Los algoritmos suelen premiar contenido emocionalmente intenso"],
        counterarguments: ["Aunque haya beneficios, el diseño de muchas plataformas maximiza comparacion y permanencia"],
        relatedConcepts: ["Apoyo social", "Curacion del feed", "Uso activo", "Uso pasivo"],
        resources: [
          {
            title: "Unfiltered: How Teens Engage in Body Image and Shaming Discussions via Instagram DMs",
            authors: "Alluhidan et al.",
            year: 2025,
            journal: "arXiv",
            studyType: "Observacional",
            participants: "67 adolescentes, 451 conversaciones y 1596 subconversaciones",
            summary: "Muestra que las conversaciones privadas sobre imagen corporal pueden incluir apoyo, critica o body shaming segun contexto.",
            limitations: "Preprint y muestra limitada; no representa toda la experiencia adolescente.",
            url: "https://arxiv.org/abs/2504.02176"
          }
        ]
      }
    ],
    known: [
      "La comparacion de apariencia es mas predictiva que el tiempo total de uso.",
      "Los filtros y contenido aspiracional pueden intensificar insatisfaccion en personas vulnerables.",
      "Tambien existen usos de apoyo, comunidad y expresion identitaria."
    ],
    unknown: [
      "Que cambios de diseño reducen daño sin eliminar beneficios sociales.",
      "Que grupos son mas vulnerables a cada plataforma concreta.",
      "Como medir efectos de algoritmos personalizados a largo plazo."
    ]
  },
  "ayuno-de-dopamina": {
    title: "Ayuno de dopamina",
    summary:
      "La version viral promete 'resetear la dopamina', pero esa explicacion es neurocientificamente engañosa. La parte rescatable es mas simple: reducir señales, habitos compulsivos y recompensas inmediatas puede ayudar a recuperar control atencional.",
    whyTrending:
      "Se hizo viral por cansancio digital, productividad extrema, NoFap, ansiedad por el movil y la idea seductora de reiniciar el cerebro.",
    status: "Ficha editorial: concepto popular con base neurocientifica debil y utilidad conductual parcial",
    support: [
      {
        title: "Reducir disparadores puede ayudar con habitos compulsivos",
        evidence: "Moderada",
        consensus: "Medio",
        explanation:
          "Si se entiende como higiene conductual, no como reset quimico, puede tener sentido: quitar notificaciones, separar movil de cama, limitar apps o diseñar fricciones reduce exposicion a señales que disparan conductas automaticas.",
        strengths: ["Conecta con principios de terapia cognitivo-conductual", "Es practico y facil de probar"],
        limitations: ["No demuestra que se reduzca dopamina basal", "Puede convertirse en regla rigida o culpabilizante"],
        counterarguments: ["Llamarlo dopamina confunde mas de lo que aclara"],
        relatedConcepts: ["Habitos", "Disparadores", "Autocontrol", "Recompensa"],
        resources: [
          {
            title: "Dopamine fasting: Misunderstanding science spawns a maladaptive fad",
            authors: "Grinspoon",
            year: 2020,
            journal: "Harvard Health Publishing",
            studyType: "Opinion",
            participants: "Comentario medico divulgativo",
            summary: "Critica la interpretacion literal de 'ayunar dopamina' y rescata la reduccion de conductas impulsivas.",
            limitations: "No es ensayo clinico ni revision sistematica.",
            url: "https://www.health.harvard.edu/blog/dopamine-fasting-misunderstanding-science-spawns-a-maladaptive-fad-2020022618917"
          }
        ]
      }
    ],
    opposition: [
      {
        title: "No puedes resetear la dopamina dejando TikTok un domingo",
        evidence: "Alta",
        consensus: "Alto",
        explanation:
          "La dopamina participa en movimiento, motivacion, aprendizaje y muchas funciones basicas. Evitar placer no 'limpia' el cerebro. La version extrema del trend usa lenguaje cientifico para vender una promesa demasiado simple.",
        strengths: ["Corrige una mala explicacion neurocientifica", "Reduce el riesgo de ascetismo inutil"],
        limitations: ["Puede sonar como que no hay problema real con habitos digitales", "No sustituye tratamiento si hay adiccion o ansiedad"],
        counterarguments: ["Aunque la teoria sea mala, algunas practicas de reduccion de estimulos pueden ayudar"],
        relatedConcepts: ["Neuro-mito", "Dopamina", "Detox digital"],
        resources: [
          {
            title: "Dopamine fasting",
            authors: "Resumen con referencias a Sepah, Grinspoon y criticas cientificas",
            year: 2026,
            journal: "Entrada de referencia",
            studyType: "Revision sistematica",
            participants: "Sintesis de debate publico y cientifico",
            summary: "Distingue la intencion conductual original de las versiones virales pseudocientificas.",
            limitations: "Fuente secundaria; util para mapear el debate, no para cerrar evidencia clinica.",
            url: "https://en.wikipedia.org/wiki/Dopamine_fasting"
          }
        ]
      }
    ],
    known: [
      "El nombre 'ayuno de dopamina' es engañoso.",
      "Reducir señales y fricciones digitales puede mejorar control de habitos en algunas personas.",
      "La version extrema puede fomentar culpa, rigidez o pensamiento magico."
    ],
    unknown: [
      "Que protocolos concretos funcionan mejor para distintos perfiles.",
      "Cuanto duran los beneficios si no cambia el entorno digital.",
      "Como separar descanso saludable de evitacion ansiosa."
    ]
  },
  "ia-reemplazara-empleos": {
    title: "¿La IA reemplazara empleos?",
    summary:
      "La IA no reemplaza 'empleos' de forma uniforme: automatiza tareas. Algunos puestos desapareceran, muchos cambiaran y otros creceran. El impacto depende de adopcion empresarial, regulacion, productividad, formacion y poder negociador.",
    whyTrending:
      "Los modelos generativos han llevado la automatizacion a trabajos creativos, administrativos, legales, educativos y tecnicos que antes parecian protegidos.",
    status: "Ficha editorial con evidencia economica emergente",
    support: [
      {
        title: "Muchas tareas cognitivas ya son tecnicamente automatizables o aumentables",
        evidence: "Alta",
        consensus: "Alto",
        explanation:
          "Informes laborales muestran alta exposicion de tareas a IA generativa, sobre todo en ocupaciones con texto, codigo, analisis, administracion o atencion al cliente. Exposicion no significa despido automatico, pero si presion para rediseñar trabajos.",
        strengths: ["Se basa en analisis de tareas, no solo titulares", "Explica por que afecta a trabajos cualificados"],
        limitations: ["Exposicion tecnica no equivale a adopcion real", "Faltan datos longitudinales post-IA generativa"],
        counterarguments: ["La IA tambien puede aumentar productividad y crear nuevas funciones"],
        relatedConcepts: ["Automatizacion", "Tareas", "Productividad", "Re-skilling"],
        resources: [
          {
            title: "The impact of AI on the workplace: Main findings from the OECD AI surveys",
            authors: "OECD",
            year: 2023,
            journal: "OECD Social, Employment and Migration Working Papers",
            studyType: "Revision sistematica",
            participants: "Encuestas y analisis de empresas y trabajadores",
            summary: "Evalua exposicion, adopcion y percepciones laborales sobre IA.",
            limitations: "La tecnologia avanza rapido y las estimaciones cambian con adopcion real.",
            url: "https://www.oecd.org/en/publications/the-impact-of-ai-on-the-workplace-main-findings-from-the-oecd-ai-surveys_ea0a0fe1-en.html"
          }
        ]
      }
    ],
    opposition: [
      {
        title: "La historia laboral sugiere transformacion, no sustitucion total inmediata",
        evidence: "Moderada",
        consensus: "Medio",
        explanation:
          "Muchas tecnologias eliminan tareas pero crean nuevas necesidades, bajan costes, aumentan demanda o cambian ocupaciones. La pregunta importante es quien captura la productividad y que trabajadores quedan peor posicionados durante la transicion.",
        strengths: ["Evita determinismo tecnologico", "Incluye instituciones, salarios y formacion"],
        limitations: ["La velocidad de adopcion podria ser mayor que en cambios previos", "Algunos perfiles si pueden sufrir desplazamiento directo"],
        counterarguments: ["Que no desaparezca todo el empleo no consuela a quienes pierden su puesto"],
        relatedConcepts: ["Complementariedad", "Desigualdad", "Transicion laboral"],
        resources: [
          {
            title: "Generative AI and Jobs: A global analysis of potential effects on job quantity and quality",
            authors: "International Labour Organization",
            year: 2023,
            journal: "ILO Working Paper",
            studyType: "Revision sistematica",
            participants: "Analisis global de ocupaciones y tareas",
            summary: "Concluye que el efecto principal podria ser aumento de tareas, aunque ciertas ocupaciones administrativas tienen alta exposicion.",
            limitations: "Estimaciones potenciales, no mediciones finales de empleo perdido.",
            url: "https://www.ilo.org/publications/generative-ai-and-jobs-global-analysis-potential-effects-job-quantity-and"
          }
        ]
      }
    ]
  },
  "red-pill": {
    title: "Red Pill",
    summary:
      "La Red Pill mezcla soledad masculina, frustracion romantica, consejos de estatus, ideas de psicologia evolutiva simplificadas y comunidades online que a menudo convierten experiencias reales en una teoria total sobre las mujeres.",
    whyTrending:
      "TikTok, YouTube e Instagram la empaquetan como autoayuda masculina, looksmaxxing, disciplina, dinero y 'verdades incomodas' sobre dating.",
    status: "Ficha editorial basada en estudios de manosfera y cultura digital",
    support: [
      {
        title: "Se alimenta de problemas reales: soledad, rechazo y falta de modelos masculinos saludables",
        evidence: "Moderada",
        consensus: "Medio",
        explanation:
          "Parte de su atractivo viene de nombrar malestares que muchos hombres jovenes sienten: aislamiento, fracaso romantico, incertidumbre economica y sensacion de no tener un lugar claro. Ignorar ese malestar deja el terreno a influencers que ofrecen respuestas simples.",
        strengths: ["Reconoce el punto de entrada emocional", "Evita ridiculizar a quienes llegan buscando ayuda"],
        limitations: ["Nombrar un problema no valida la ideologia que lo interpreta", "Puede convertir dolor personal en resentimiento colectivo"],
        counterarguments: ["Hay formas de hablar de masculinidad sin misoginia ni fatalismo biologico"],
        relatedConcepts: ["Soledad masculina", "Estatus", "Identidad", "Dating apps"],
        resources: [
          {
            title: "The Manosphere as an Online Protection Racket",
            authors: "Ging",
            year: 2019,
            journal: "International Journal of Communication",
            studyType: "Observacional",
            participants: "Analisis de discursos y comunidades online",
            summary: "Analiza como espacios de la manosfera combinan agravio masculino, identidad y hostilidad hacia el feminismo.",
            limitations: "Analisis cultural; no mide causalidad individual.",
            url: "https://ijoc.org/index.php/ijoc/article/view/12751"
          }
        ]
      }
    ],
    opposition: [
      {
        title: "Convierte patrones parciales de dating en dogma sobre todas las mujeres",
        evidence: "Alta",
        consensus: "Alto",
        explanation:
          "Muchas tesis Red Pill toman observaciones reales o plausibles - atractivo, estatus, seleccion de pareja - y las absolutizan. El resultado suele ser una teoria cerrada: si algo encaja, confirma; si no encaja, se redefine como excepcion o engaño.",
        strengths: ["Detecta pensamiento conspirativo y sesgo de confirmacion", "Separa psicologia evolutiva seria de simplificaciones virales"],
        limitations: ["No toda conversacion sobre hombres y dating es Red Pill", "Algunas criticas a normas romanticas modernas pueden ser validas"],
        counterarguments: ["Criticar la ideologia no resuelve por si solo los problemas que la hacen atractiva"],
        relatedConcepts: ["Sesgo de confirmacion", "Esencialismo", "Misoginia online"],
        resources: [
          {
            title: "Manosphere",
            authors: "Resumen con referencias academicas sobre comunidades online masculinas",
            year: 2026,
            journal: "Entrada de referencia",
            studyType: "Revision sistematica",
            participants: "Sintesis de estudios de cultura digital",
            summary: "Mapea subcomunidades, ideas recurrentes y vinculos con misoginia online.",
            limitations: "Fuente secundaria; debe complementarse con articulos academicos concretos.",
            url: "https://en.wikipedia.org/wiki/Manosphere"
          }
        ]
      }
    ],
    known: [
      "La Red Pill funciona como identidad y comunidad, no solo como conjunto de argumentos.",
      "Su atractivo aumenta cuando no existen espacios sanos para hablar de malestar masculino.",
      "Muchas afirmaciones mezclan datos parciales con generalizaciones totalizantes."
    ],
    unknown: [
      "Que intervenciones reducen radicalizacion sin avergonzar a hombres jovenes vulnerables.",
      "Como influyen algoritmos de recomendacion en el paso de autoayuda a misoginia.",
      "Que parte del contenido funciona como entretenimiento y que parte como ideologia estable."
    ]
  },
  "libertad-de-expresion-y-desinformacion": {
    title: "Libertad de expresion y desinformacion",
    summary:
      "El dilema no es libertad o verdad. Es como proteger la expresion politica, la critica y el disenso sin dejar que mentiras virales, acoso coordinado o propaganda conviertan el espacio publico en una maquina de confusion.",
    whyTrending:
      "Meta, X, TikTok y YouTube han convertido la moderacion en una batalla cultural: unos ven censura ideologica; otros ven abandono frente a odio, fraude sanitario, propaganda y manipulacion electoral.",
    status: "Ficha editorial basada en investigacion sobre desinformacion, moderacion y comportamiento en redes",
    support: [
      {
        title: "La moderacion puede reducir danos reales cuando es transparente y proporcional",
        evidence: "Alta",
        consensus: "Alto",
        explanation:
          "La desinformacion no circula solo porque falten datos. Circula porque explota atencion, identidad, repeticion, emocion y confianza social. Etiquetas, reduccion de alcance, avisos de precision y friccion antes de compartir pueden disminuir la difusion de contenido falso sin borrar todo lo polemico.",
        strengths: ["Se centra en conductas de amplificacion, no solo en castigar opiniones", "Permite intervenciones graduadas antes que prohibiciones totales"],
        limitations: ["Puede aplicarse con sesgos politicos o comerciales", "Los sistemas automatizados fallan con ironia, contexto local y lenguas minoritarias"],
        counterarguments: ["Una plataforma privada no deberia decidir sola que cuenta como verdad publica"],
        relatedConcepts: ["Friccion", "Fact-checking", "Alcance algoritmico", "Transparencia"],
        resources: [
          {
            title: "Shifting attention to accuracy can reduce misinformation online",
            authors: "Pennycook, Epstein, Mosleh, Arechar, Eckles, Rand",
            year: 2021,
            journal: "Nature",
            studyType: "Ensayo clinico",
            participants: "Experimentos online sobre precision y disposicion a compartir noticias",
            summary: "Muestra que hacer saliente la precision puede reducir la intencion de compartir desinformacion.",
            limitations: "Mide tareas experimentales y conducta de compartir, no todos los contextos politicos reales.",
            url: "https://www.nature.com/articles/s41586-021-03344-2"
          },
          {
            title: "The psychological drivers of misinformation belief and its resistance to correction",
            authors: "Ecker et al.",
            year: 2022,
            journal: "Nature Reviews Psychology",
            studyType: "Revision sistematica",
            participants: "Sintesis de investigacion psicologica sobre creencias falsas y correcciones",
            summary: "Revisa mecanismos como familiaridad, identidad, sesgos y resistencia a la correccion.",
            limitations: "La evidencia psicologica no resuelve por si sola el diseno juridico de la moderacion.",
            url: "https://www.nature.com/articles/s44159-021-00006-y"
          }
        ]
      }
    ],
    opposition: [
      {
        title: "La lucha contra la desinformacion puede convertirse en censura o paternalismo",
        evidence: "Moderada",
        consensus: "Medio",
        explanation:
          "El peligro contrario es real: etiquetar como peligroso lo que en realidad es disenso, error razonable, satira o critica al poder. En temas politicos y cientificos cambiantes, una verdad institucional puede corregirse despues. Por eso las mejores politicas explican criterios, permiten apelacion y separan contenido ilegal de contenido simplemente discutible.",
        strengths: ["Protege disenso, investigacion y critica minoritaria", "Recuerda que las instituciones tambien tienen incentivos y sesgos"],
        limitations: ["Puede minimizar danos cuando la informacion falsa afecta salud, elecciones o violencia", "La no intervencion tambien favorece a actores con mas dinero, bots o coordinacion"],
        counterarguments: ["La libertad de expresion no garantiza derecho a amplificacion algoritmica ilimitada"],
        relatedConcepts: ["Censura", "Debido proceso", "Pluralismo", "Poder privado"],
        resources: [
          {
            title: "SoK: Content Moderation in Social Media, from Guidelines to Enforcement, and Research to Practice",
            authors: "Singhal et al.",
            year: 2022,
            journal: "arXiv",
            studyType: "Revision sistematica",
            participants: "Analisis de guias de catorce plataformas y mas de doscientos trabajos",
            summary: "Mapea diferencias entre reglas, aplicacion y problemas practicos de moderacion.",
            limitations: "Trabajo de sintesis tecnica; no fija una frontera moral unica para todos los paises.",
            url: "https://arxiv.org/abs/2206.14855"
          }
        ]
      }
    ],
    known: [
      "La desinformacion se alimenta de identidad, emocion, repeticion y diseno de plataformas.",
      "Intervenciones ligeras pueden reducir compartidos falsos sin borrar todo el contenido.",
      "La moderacion sin transparencia erosiona confianza y puede castigar disenso legitimo."
    ],
    unknown: [
      "Que combinacion de etiquetas, reduccion de alcance y apelaciones funciona mejor por tema.",
      "Como auditar sesgos de moderacion sin exponer sistemas a manipulacion.",
      "Como proteger lenguas y contextos locales con menos recursos de fact-checking."
    ],
    biases: ["Sesgo de confirmacion", "Identidad de grupo", "Efecto de verdad ilusoria", "Reactancia"]
  },
  "renta-basica-universal": {
    title: "Renta basica universal",
    summary:
      "La renta basica promete seguridad material sin burocracia ni estigma, pero su version universal exige decidir impuestos, sustitucion de ayudas, cuantia, inflacion, vivienda y efectos laborales. No es magia: es arquitectura fiscal.",
    whyTrending:
      "La precariedad, la automatizacion y la IA han devuelto la idea a TikTok, podcasts y politica: para algunos es libertad frente al mercado; para otros, una promesa carisima que no arregla vivienda, salud ni salarios.",
    status: "Ficha editorial basada en pilotos de ingresos garantizados y evaluaciones de bienestar",
    support: [
      {
        title: "El dinero incondicional puede reducir estres y dar margen de decision",
        evidence: "Moderada",
        consensus: "Medio",
        explanation:
          "Los pilotos muestran que recibir ingresos sin condiciones puede mejorar seguridad, bienestar subjetivo y capacidad de planificar. La clave es que la pobreza no es solo falta de motivacion: tambien consume atencion, tiempo y energia mental. Un suelo de ingresos puede facilitar mejores decisiones, no sustituirlas.",
        strengths: ["Reduce estigma y burocracia", "Da flexibilidad para necesidades distintas"],
        limitations: ["Muchos pilotos son temporales, locales y no plenamente universales", "Los efectos pueden cambiar si se financia con impuestos a gran escala"],
        counterarguments: ["Una transferencia pequena puede aliviar sin transformar las causas de pobreza"],
        relatedConcepts: ["Escasez mental", "Seguridad economica", "Burocracia", "Autonomia"],
        resources: [
          {
            title: "The basic income experiment 2017-2018 in Finland",
            authors: "Kangas, Jauhiainen, Simanainen, Ylikanno",
            year: 2020,
            journal: "Kela",
            studyType: "Ensayo clinico",
            participants: "2.000 personas desempleadas y grupo control amplio",
            summary: "El experimento finlandes encontro mejoras de bienestar y confianza, con efectos modestos sobre empleo.",
            limitations: "Solo incluyo personas desempleadas y una cuantia concreta durante dos anos.",
            url: "https://julkaisut.valtioneuvosto.fi/handle/10024/162219"
          }
        ]
      }
    ],
    opposition: [
      {
        title: "La pregunta dificil es financiacion y coste de oportunidad",
        evidence: "Alta",
        consensus: "Alto",
        explanation:
          "Una renta universal suficiente para cambiar vidas cuesta mucho porque se paga tambien a quien no la necesita. Si sustituye servicios o ayudas focalizadas, algunas personas vulnerables podrian perder apoyos especificos. Si se suma a todo, requiere impuestos altos o nuevas fuentes de financiacion.",
        strengths: ["Obliga a comparar con vivienda, sanidad, guarderias o empleo publico", "Distingue ingreso garantizado para pobres de renta universal completa"],
        limitations: ["El coste bruto puede exagerar el coste neto si se recicla via impuestos", "No captura beneficios indirectos como salud o reduccion burocratica"],
        counterarguments: ["La universalidad puede aumentar apoyo politico y reducir trampas de pobreza"],
        relatedConcepts: ["Coste fiscal", "Trampa de pobreza", "Universalismo", "Redistribucion"],
        resources: [
          {
            title: "The Employment Effects of a Guaranteed Income: Experimental Evidence from Two U.S. States",
            authors: "Vivalt et al.",
            year: 2024,
            journal: "NBER Working Paper",
            studyType: "Ensayo clinico",
            participants: "3.000 personas de bajos ingresos en Illinois y Texas",
            summary: "Evalua pagos mensuales incondicionales y encuentra efectos matizados sobre trabajo, bienestar y uso del tiempo.",
            limitations: "No es una renta universal nacional y se realizo en un contexto economico concreto.",
            url: "https://www.nber.org/papers/w32719"
          }
        ]
      }
    ],
    known: [
      "Los pagos incondicionales pueden mejorar bienestar y seguridad financiera en pilotos.",
      "Los efectos laborales observados suelen ser menores que los temores extremos.",
      "La universalidad cambia por completo el problema fiscal frente a ayudas focalizadas."
    ],
    unknown: [
      "Que pasaria con precios de vivienda y salarios si fuera permanente y nacional.",
      "Que combinacion de renta, servicios publicos e impuestos protege mejor a los vulnerables.",
      "Como responderia el mercado laboral durante decadas, no solo en pilotos temporales."
    ],
    biases: ["Pensamiento magico", "Aversion a impuestos", "Efecto ideologia", "Falso dilema"]
  },
  "masculinidad-contemporanea": {
    title: "Masculinidad contemporanea",
    summary:
      "El debate serio no va de odiar a los hombres ni de defender cualquier tradicion. Va de distinguir necesidades reales -soledad, sentido, deseo, respeto, salud mental- de guiones que convierten vulnerabilidad en verguenza o poder sobre otros.",
    whyTrending:
      "La conversacion se ha partido entre terapia, Red Pill, looksmaxxing, estoicismo viral, crisis de pareja, soledad masculina y rechazo a la palabra 'toxico'.",
    status: "Ficha editorial basada en psicologia de normas masculinas, salud mental y cultura digital",
    support: [
      {
        title: "Algunos hombres necesitan modelos positivos, no solo reproches",
        evidence: "Moderada",
        consensus: "Medio",
        explanation:
          "Parte del atractivo de creadores masculinos viene de ofrecer pertenencia, direccion y lenguaje para frustraciones reales. Hablar de disciplina, amistad, cuidado fisico, responsabilidad y proposito puede ser valioso cuando no se convierte en desprecio hacia mujeres o vulnerabilidad.",
        strengths: ["Reconoce malestar masculino sin ridiculizarlo", "Permite construir alternativas sanas a la manosfera"],
        limitations: ["Puede ser capturado por influencers que venden estatus y resentimiento", "El lenguaje de 'modelos positivos' puede esconder nostalgia jerarquica"],
        counterarguments: ["Una respuesta sana no necesita volver a dominacion ni roles rigidos"],
        relatedConcepts: ["Soledad", "Proposito", "Amistad masculina", "Salud mental"],
        resources: [
          {
            title: "The APA Guidelines for Psychological Practice with Boys and Men",
            authors: "American Psychological Association",
            year: 2018,
            journal: "APA Guidelines",
            studyType: "Revision sistematica",
            participants: "Sintesis profesional de investigacion y practica clinica",
            summary: "Propone trabajar con hombres atendiendo socializacion, poder, diversidad, salud y vulnerabilidad.",
            limitations: "Guia profesional estadounidense, no una ley universal sobre masculinidad.",
            url: "https://www.apa.org/about/policy/boys-men-practice-guidelines.pdf"
          }
        ]
      }
    ],
    opposition: [
      {
        title: "Las normas rigidas de masculinidad se asocian con peor salud mental y menos ayuda",
        evidence: "Alta",
        consensus: "Alto",
        explanation:
          "La evidencia no dice que ser hombre sea problematico. Dice que ciertas normas -autosuficiencia extrema, control emocional obligatorio, dominancia, desprecio por lo femenino- se relacionan con depresion, peor funcionamiento social y menor busqueda de ayuda.",
        strengths: ["Separa identidad masculina de normas daninas concretas", "Conecta cultura con conductas medibles de salud"],
        limitations: ["Las asociaciones no prueban todos los mecanismos causales", "Las normas masculinas varian por clase, cultura, edad y orientacion sexual"],
        counterarguments: ["Algunas virtudes asociadas a masculinidad, como coraje o responsabilidad, pueden ser protectoras si no son rigidas"],
        relatedConcepts: ["Autosuficiencia", "Alexitimia", "Busqueda de ayuda", "Normas de genero"],
        resources: [
          {
            title: "Meta-analyses of the relationship between conformity to masculine norms and mental health-related outcomes",
            authors: "Wong, Ho, Wang, Miller",
            year: 2017,
            journal: "Journal of Counseling Psychology",
            studyType: "Metaanalisis",
            participants: "78 muestras y 19.453 participantes",
            summary: "Asocia conformidad a normas masculinas tradicionales con peores resultados de salud mental y menor busqueda de ayuda.",
            limitations: "Mayormente estudios correlacionales y con heterogeneidad entre normas concretas.",
            url: "https://doi.org/10.1037/cou0000176"
          }
        ]
      }
    ],
    known: [
      "No todas las normas masculinas tienen el mismo efecto.",
      "La autosuficiencia extrema y la verguenza ante la vulnerabilidad son puntos de riesgo.",
      "Los hombres necesitan espacios de pertenencia que no dependan del resentimiento."
    ],
    unknown: [
      "Que formatos online ayudan sin empujar hacia radicalizacion.",
      "Como adaptar intervenciones a culturas, clases sociales y edades distintas.",
      "Que modelos masculinos resultan atractivos y saludables a la vez."
    ],
    biases: ["Esencialismo", "Generalizacion apresurada", "Reactancia", "Sesgo de identidad"]
  },
  "trad-wives": {
    title: "Trad Wives",
    summary:
      "Trad Wives no es solo 'querer quedarse en casa'. Es una estetica viral que mezcla domesticidad, feminidad tradicional, nostalgia, religion, economia de influencers y debate sobre libertad o dependencia.",
    whyTrending:
      "Instagram y TikTok convierten cocina, maternidad, vestidos, granjas y matrimonio tradicional en una fantasia visual muy rentable y politicamente interpretable.",
    status: "Ficha editorial con evidencia sociologica y cultural",
    support: [
      {
        title: "Puede expresar una eleccion legitima contra el agotamiento laboral moderno",
        evidence: "Moderada",
        consensus: "Medio",
        explanation:
          "Para algunas mujeres, priorizar hogar, crianza o una division tradicional de roles puede ser una decision acordada y significativa. La critica al mercado laboral, al burnout y a la falsa idea de 'tenerlo todo' no es automaticamente reaccionaria.",
        strengths: ["Distingue eleccion personal de imposicion ideologica", "Reconoce el valor real del cuidado y trabajo domestico"],
        limitations: ["La estetica viral puede ocultar dinero, ayuda externa o privilegio", "La eleccion depende de seguridad economica y posibilidad real de salir"],
        counterarguments: ["La libertad individual no elimina riesgos estructurales de dependencia"],
        relatedConcepts: ["Trabajo de cuidados", "Burnout", "Eleccion", "Dependencia economica"],
        resources: [
          {
            title: "Tradwife",
            authors: "Resumen con referencias sobre subcultura digital",
            year: 2026,
            journal: "Entrada de referencia",
            studyType: "Revision sistematica",
            participants: "Sintesis de literatura y cobertura cultural",
            summary: "Describe el surgimiento de la estetica tradwife y sus conexiones con roles de genero, redes y politica.",
            limitations: "Fuente secundaria; requiere ampliacion con estudios academicos especificos.",
            url: "https://en.wikipedia.org/wiki/Tradwife"
          }
        ]
      }
    ],
    opposition: [
      {
        title: "Puede romantizar dependencia economica y desigualdad de poder",
        evidence: "Moderada",
        consensus: "Medio",
        explanation:
          "El riesgo no es cocinar pan o cuidar hijos. El riesgo es vender como fantasia universal una estructura donde una persona pierde ingresos, experiencia laboral, pension, red propia o capacidad de negociar si la relacion se rompe.",
        strengths: ["Conecta estetica con consecuencias materiales", "Visibiliza trabajo domestico no pagado"],
        limitations: ["No todas las parejas tradicionales son coercitivas", "Puede caer en desprecio hacia decisiones domesticas autenticas"],
        counterarguments: ["Una pareja puede compensar riesgos con acuerdos legales, ahorros y reparto explicito de poder"],
        relatedConcepts: ["Poder economico", "Trabajo no remunerado", "Riesgo de salida"],
        resources: [
          {
            title: "Time use and unpaid work data",
            authors: "OECD",
            year: 2024,
            journal: "OECD Data",
            studyType: "Observacional",
            participants: "Comparaciones internacionales de uso del tiempo",
            summary: "Muestra diferencias de genero en trabajo remunerado y no remunerado, clave para evaluar roles domesticos.",
            limitations: "Datos agregados; no juzgan acuerdos individuales.",
            url: "https://www.oecd.org/gender/data/"
          }
        ]
      }
    ]
  },
  "feminismo-4b": {
    title: "Feminismo 4B",
    summary:
      "El 4B es una estrategia separatista surgida en Corea del Sur que rechaza citas, matrimonio, sexo y maternidad con hombres. Puede leerse como protesta ante misoginia estructural, pero tambien como postura radical con limites y tensiones internas.",
    whyTrending:
      "Tras debates sobre derechos reproductivos, violencia de genero y polarizacion politica, el 4B se volvio viral fuera de Corea como gesto de rechazo al poder masculino.",
    status: "Ficha editorial basada en estudios de movimientos digitales y genero",
    support: [
      {
        title: "Funciona como protesta contra costes reales del patriarcado",
        evidence: "Moderada",
        consensus: "Medio",
        explanation:
          "En el contexto surcoreano, el 4B se conecta con debates sobre violencia, desigualdad laboral, presion estetica, maternidad, matrimonio y rechazo al rol femenino tradicional. Su fuerza simbolica esta en convertir la vida privada en protesta politica.",
        strengths: ["Situa el movimiento en contexto historico y cultural", "Explica por que resulta atractivo para mujeres hartas de negociar lo basico"],
        limitations: ["No representa a todo el feminismo coreano ni global", "Puede viajar mal cuando se copia sin contexto"],
        counterarguments: ["La separacion total no construye necesariamente instituciones mas justas"],
        relatedConcepts: ["Separatismo", "Autonomia corporal", "Patriarcado", "Protesta digital"],
        resources: [
          {
            title: "The 4B movement: envisioning a feminist future with/in a non-reproductive future in Korea",
            authors: "Lee, Jeong",
            year: 2021,
            journal: "Journal of Gender Studies",
            studyType: "Observacional",
            participants: "Analisis de movimiento y discurso",
            summary: "Analiza el 4B como imaginario feminista vinculado a no reproduccion, matrimonio y futuro politico.",
            limitations: "Analisis cualitativo; no mide apoyo poblacional general.",
            url: "https://www.tandfonline.com/doi/full/10.1080/09589236.2021.1929097"
          }
        ]
      }
    ],
    opposition: [
      {
        title: "Puede convertirse en identidad de cierre y no en estrategia transformadora",
        evidence: "Moderada",
        consensus: "Medio",
        explanation:
          "La critica fuerte al patriarcado no obliga a aceptar que el separatismo sea la mejor estrategia para todas. Puede crear pertenencia y proteccion, pero tambien rigidez, exclusion o incapacidad de construir alianzas amplias.",
        strengths: ["Distingue diagnostico y estrategia", "Permite criticar el movimiento sin negar misoginia real"],
        limitations: ["Las criticas externas pueden minimizar el contexto de violencia o desigualdad", "No todas las participantes sostienen la misma version"],
        counterarguments: ["Para algunas mujeres, retirarse de relaciones desiguales es una forma practica de seguridad"],
        relatedConcepts: ["Estrategia politica", "Coalicion", "Radicalidad", "Seguridad"],
        resources: [
          {
            title: "4B movement",
            authors: "Resumen con referencias academicas y periodisticas",
            year: 2026,
            journal: "Entrada de referencia",
            studyType: "Revision sistematica",
            participants: "Sintesis historica del movimiento",
            summary: "Resume origen, principios, recepcion y controversias del 4B en Corea del Sur y su difusion internacional.",
            limitations: "Fuente secundaria; util para orientacion, no como evidencia unica.",
            url: "https://en.wikipedia.org/wiki/4B_movement"
          }
        ]
      }
    ]
  },
  "ayuno-intermitente": {
    title: "Ayuno intermitente",
    summary:
      "El ayuno intermitente puede ser una forma util de reducir ingesta y ordenar habitos, pero no parece magicamente superior a comer menos calorias con otro horario. Su valor depende de adherencia, salud metabolica, relacion con la comida y contexto medico.",
    whyTrending:
      "En Instagram y TikTok se vende como biohack, metodo antiinflamatorio, herramienta de perdida de grasa y camino hacia longevidad, a menudo con promesas mas fuertes que la evidencia humana.",
    status: "Ficha editorial con evidencia clinica moderada",
    support: [
      {
        title: "Puede ayudar a perder peso si facilita un deficit calorico sostenible",
        evidence: "Alta",
        consensus: "Alto",
        explanation:
          "En muchas personas, comer en una ventana mas corta reduce oportunidades de picoteo y simplifica decisiones. Cuando produce perdida de peso, el mecanismo principal suele ser la reduccion de energia total, no una ventaja metabolica misteriosa.",
        strengths: ["Es facil de explicar y aplicar", "Puede mejorar adherencia en personas que odian contar calorias"],
        limitations: ["No funciona si se compensa comiendo mas en la ventana permitida", "Puede empeorar relacion con la comida en personas vulnerables"],
        counterarguments: ["Otros patrones alimentarios pueden lograr resultados similares con menos rigidez social"],
        relatedConcepts: ["Deficit calorico", "Adherencia", "Ventana alimentaria", "Saciedad"],
        resources: [
          {
            title: "Effect of Time-Restricted Eating on Weight Loss in Adults With Overweight and Obesity",
            authors: "Lowe et al.",
            year: 2020,
            journal: "JAMA Internal Medicine",
            studyType: "Ensayo clinico",
            participants: "116 adultos",
            summary: "Ensayo aleatorizado de alimentacion restringida por tiempo; no encontro una ventaja clara frente al grupo control para perdida de peso.",
            limitations: "Duracion limitada y adherencia variable; no evalua todas las modalidades de ayuno.",
            url: "https://jamanetwork.com/journals/jamainternalmedicine/fullarticle/2771095"
          },
          {
            title: "Intermittent fasting and weight loss: Systematic review",
            authors: "Cochrane / revisiones clinicas recientes",
            year: 2026,
            journal: "Cochrane Database / BMJ Evidence",
            studyType: "Metaanalisis",
            participants: "Ensayos con adultos con sobrepeso u obesidad",
            summary: "Las revisiones suelen encontrar perdida de peso modesta y resultados parecidos a restriccion calorica continua cuando se iguala energia.",
            limitations: "Muchos estudios son cortos y con muestras pequenas.",
            url: "https://www.cochranelibrary.com/"
          }
        ]
      }
    ],
    opposition: [
      {
        title: "No es una solucion universal y puede ser mala idea para algunas personas",
        evidence: "Alta",
        consensus: "Alto",
        explanation:
          "Personas con historial de trastorno alimentario, embarazo, bajo peso, diabetes con medicacion o ansiedad intensa alrededor de comida deben tener especial cuidado. El problema no es saltarse una comida, sino convertir la restriccion en identidad o regla inflexible.",
        strengths: ["Introduce seguridad clinica", "Evita convertir una herramienta en dogma"],
        limitations: ["Puede sonar conservador para personas sanas que lo toleran bien", "No sustituye evaluacion medica individual"],
        counterarguments: ["Bien pautado, puede ser una herramienta simple y segura para muchos adultos"],
        relatedConcepts: ["Trastornos alimentarios", "Flexibilidad", "Riesgo medico"],
        resources: [
          {
            title: "Intermittent fasting: What are the benefits?",
            authors: "Mayo Clinic",
            year: 2024,
            journal: "Mayo Clinic Health Information",
            studyType: "Opinion",
            participants: "Revision clinica divulgativa",
            summary: "Resume beneficios potenciales y precauciones medicas del ayuno intermitente.",
            limitations: "Divulgativo; no sustituye guias clinicas personalizadas.",
            url: "https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/in-depth/intermittent-fasting/art-20441303"
          }
        ]
      }
    ],
    known: [
      "El beneficio principal suele depender de adherencia y menor ingesta total.",
      "No hay evidencia fuerte de superioridad universal frente a restriccion calorica continua.",
      "La seguridad depende del perfil medico y psicologico."
    ],
    unknown: [
      "Efectos a largo plazo sobre mantenimiento de peso y salud cardiovascular.",
      "Que modalidad funciona mejor para cada perfil.",
      "Como impacta en salud mental alimentaria en poblaciones jovenes."
    ]
  },
  "energia-nuclear": {
    title: "Energia nuclear",
    summary:
      "La nuclear es una fuente baja en carbono y estable, capaz de producir mucha electricidad con poca superficie. Sus grandes debates son coste, tiempos de construccion, residuos, seguridad, regulacion y comparacion con renovables mas almacenamiento.",
    whyTrending:
      "El cambio climatico, la crisis energetica europea y el crecimiento electrico por IA han reabierto una pregunta que muchos paises daban por cerrada.",
    status: "Ficha editorial con evidencia tecnica alta y debate economico abierto",
    support: [
      {
        title: "Produce electricidad baja en carbono de forma continua",
        evidence: "Alta",
        consensus: "Alto",
        explanation:
          "Los analisis de ciclo de vida sitúan las emisiones de la nuclear cerca de renovables y muy por debajo de gas o carbon. Su ventaja especifica es generar potencia firme sin depender del tiempo atmosferico.",
        strengths: ["Bajas emisiones por kWh", "Alta densidad energetica", "Puede estabilizar sistemas electricos"],
        limitations: ["Construir nuevas plantas puede ser lento y caro", "La comparacion depende del pais, regulacion y proyecto"],
        counterarguments: ["Renovables, redes y baterias pueden ser mas rapidas y baratas en muchos contextos"],
        relatedConcepts: ["Carga base", "Ciclo de vida", "Descarbonizacion", "Potencia firme"],
        resources: [
          {
            title: "Climate Change 2014: Mitigation of Climate Change",
            authors: "IPCC Working Group III",
            year: 2014,
            journal: "IPCC Assessment Report",
            studyType: "Revision sistematica",
            participants: "Sintesis global de literatura climatica",
            summary: "Situa la nuclear entre tecnologias bajas en carbono con emisiones de ciclo de vida comparables a renovables.",
            limitations: "Costes y tiempos cambian por pais y tecnologia.",
            url: "https://www.ipcc.ch/report/ar5/wg3/"
          },
          {
            title: "Life Cycle Assessment Harmonization",
            authors: "National Renewable Energy Laboratory",
            year: 2013,
            journal: "NREL",
            studyType: "Revision sistematica",
            participants: "Armonizacion de estudios de ciclo de vida",
            summary: "Compara emisiones de distintas fuentes electricas mediante metodologia de ciclo de vida.",
            limitations: "Estimaciones dependen de supuestos de construccion, combustible y operacion.",
            url: "https://www.nrel.gov/analysis/life-cycle-assessment.html"
          }
        ]
      }
    ],
    opposition: [
      {
        title: "El problema principal no es solo seguridad: es coste, tiempo y gobernanza",
        evidence: "Moderada",
        consensus: "Medio",
        explanation:
          "Una central nuclear puede ser climaticamente atractiva y aun asi llegar tarde o demasiado cara. La pregunta politica es donde cada euro y cada año reducen mas emisiones: nuclear nueva, extender plantas existentes, renovables, redes, almacenamiento o eficiencia.",
        strengths: ["Centra el debate en decisiones reales", "Evita pelear solo con Chernobyl o Fukushima"],
        limitations: ["Los costes varian mucho por pais y aprendizaje industrial", "No captura valor de estabilidad del sistema"],
        counterarguments: ["Cerrar nuclear existente puede aumentar emisiones si se sustituye con fosiles"],
        relatedConcepts: ["Coste de oportunidad", "Permisos", "Residuos", "Riesgo regulatorio"],
        resources: [
          {
            title: "Projected Costs of Generating Electricity",
            authors: "IEA and OECD Nuclear Energy Agency",
            year: 2020,
            journal: "IEA / NEA",
            studyType: "Revision sistematica",
            participants: "Comparacion internacional de costes electricos",
            summary: "Compara costes de generacion por tecnologia y muestra variacion fuerte entre paises y supuestos.",
            limitations: "Los costes cambian con tipos de interes, cadena de suministro y regulacion.",
            url: "https://www.iea.org/reports/projected-costs-of-generating-electricity-2020"
          }
        ]
      }
    ]
  },
  "coches-electricos": {
    title: "Coches electricos",
    summary:
      "Los coches electricos suelen reducir emisiones de ciclo de vida frente a combustion, especialmente con redes limpias. Pero no eliminan problemas de movilidad: mineria, peso, coste, espacio urbano, neumaticos, congestion y dependencia del coche.",
    whyTrending:
      "Son simbolo de transicion verde, guerra cultural, politica industrial, China, Tesla, baterias, autonomia y miedo a perder libertad de movimiento.",
    status: "Ficha editorial con evidencia alta en clima y debate abierto en justicia material",
    support: [
      {
        title: "En ciclo de vida suelen emitir menos que coches de gasolina o diesel",
        evidence: "Alta",
        consensus: "Alto",
        explanation:
          "Fabricar la bateria aumenta emisiones iniciales, pero durante el uso el coche electrico recupera esa diferencia, sobre todo si la electricidad se descarboniza. La ventaja aumenta con mas kilometros y redes mas limpias.",
        strengths: ["Analiza todo el ciclo de vida, no solo tubo de escape", "Encaja con descarbonizacion electrica"],
        limitations: ["La ventaja depende de tamaño de bateria, mix electrico y vida util", "No todos los modelos son igual de eficientes"],
        counterarguments: ["Un SUV electrico pesado no resuelve todos los impactos del coche privado"],
        relatedConcepts: ["Ciclo de vida", "Mix electrico", "Baterias", "Eficiencia"],
        resources: [
          {
            title: "Global EV Outlook 2024",
            authors: "International Energy Agency",
            year: 2024,
            journal: "IEA",
            studyType: "Revision sistematica",
            participants: "Datos globales de vehiculos electricos y emisiones",
            summary: "Evalua ventas, baterias, politicas y reducciones de emisiones asociadas a electrificacion.",
            limitations: "Escenarios dependen de politicas y ritmo de descarbonizacion electrica.",
            url: "https://www.iea.org/reports/global-ev-outlook-2024"
          }
        ]
      }
    ],
    opposition: [
      {
        title: "Electrificar coches no equivale a resolver transporte sostenible",
        evidence: "Alta",
        consensus: "Alto",
        explanation:
          "Los electricos reducen emisiones directas y ruido local, pero mantienen congestion, ocupacion de espacio, dependencia del coche y parte de impactos por mineria y materiales. La transicion mas robusta combina electrificacion con transporte publico, caminar, bici y ciudades menos dependientes del coche.",
        strengths: ["Evita techno-solutionism", "Incluye justicia ambiental y urbana"],
        limitations: ["En zonas rurales el coche puede seguir siendo necesario", "No todas las ciudades pueden cambiar rapido su infraestructura"],
        counterarguments: ["Aunque no sean solucion total, sustituyen una fuente grande de emisiones"],
        relatedConcepts: ["Minerales criticos", "Justicia ambiental", "Movilidad", "Urbanismo"],
        resources: [
          {
            title: "Critical Minerals Market Review 2024",
            authors: "International Energy Agency",
            year: 2024,
            journal: "IEA",
            studyType: "Revision sistematica",
            participants: "Mercados globales de litio, cobre, niquel, cobalto y tierras raras",
            summary: "Analiza demanda, suministro, reciclaje y riesgos de cadenas de suministro para tecnologias limpias.",
            limitations: "No es analisis etnografico de comunidades mineras; requiere fuentes de justicia ambiental.",
            url: "https://www.iea.org/reports/global-critical-minerals-outlook-2024"
          }
        ]
      }
    ]
  },
  "vacunas-y-confianza-publica": {
    title: "Vacunas y confianza publica",
    summary:
      "Las vacunas son una de las intervenciones de salud publica con evidencia historica mas fuerte. La duda real no siempre nace de ignorancia: tambien de confianza institucional, comunicacion de riesgos, acceso, experiencias previas y polarizacion.",
    whyTrending:
      "La pandemia convirtio vacunas, mandatos, efectos adversos y libertad individual en simbolos politicos muy cargados emocionalmente.",
    status: "Ficha editorial con evidencia alta sobre eficacia y debate social sobre confianza",
    support: [
      {
        title: "La evidencia historica sobre beneficios de vacunacion es muy fuerte",
        evidence: "Alta",
        consensus: "Alto",
        explanation:
          "Vacunas han reducido de forma enorme enfermedades como viruela, polio, sarampion o tetanos. En terminos poblacionales, no solo protegen individuos: reducen transmision y protegen a quienes no pueden vacunarse.",
        strengths: ["Amplia evidencia historica y epidemiologica", "Beneficios poblacionales medibles"],
        limitations: ["Cada vacuna debe evaluarse por separado", "Eficacia, duracion y efectos adversos varian por producto"],
        counterarguments: ["La confianza se erosiona si se comunica como si no existiera ningun riesgo"],
        relatedConcepts: ["Inmunidad comunitaria", "Riesgo-beneficio", "Salud publica"],
        resources: [
          {
            title: "Vaccines and immunization",
            authors: "World Health Organization",
            year: 2024,
            journal: "WHO Fact Sheets",
            studyType: "Revision sistematica",
            participants: "Sintesis global de evidencia y programas",
            summary: "Resume principios, impacto y seguridad de la vacunacion como intervencion de salud publica.",
            limitations: "Documento institucional; para vacunas concretas requiere informes especificos.",
            url: "https://www.who.int/health-topics/vaccines-and-immunization"
          }
        ]
      }
    ],
    opposition: [
      {
        title: "Tratar toda duda como estupidez puede empeorar la desconfianza",
        evidence: "Alta",
        consensus: "Alto",
        explanation:
          "La hesitacion vacunal es compleja y contextual. Mezcla confianza, complacencia, conveniencia, identidad politica, experiencias medicas y miedo. La comunicacion eficaz no consiste solo en lanzar datos, sino en reconocer incertidumbre y responder a preocupaciones concretas.",
        strengths: ["Explica por que la informacion sola no basta", "Evita polarizar mas"],
        limitations: ["Reconocer preocupaciones no valida desinformacion", "Puede ser explotado por activistas antivacunas"],
        counterarguments: ["En brotes graves, la comunicacion empatica debe combinarse con medidas de salud publica"],
        relatedConcepts: ["Hesitacion vacunal", "Confianza", "Riesgo", "Desinformacion"],
        resources: [
          {
            title: "Strategies for addressing vaccine hesitancy - A systematic review",
            authors: "Jarrett et al.",
            year: 2015,
            journal: "Vaccine",
            studyType: "Revision sistematica",
            participants: "Revision de intervenciones sobre aceptacion vacunal",
            summary: "Concluye que estrategias multicomponente y adaptadas al contexto son mas prometedoras que mensajes genericos.",
            limitations: "Heterogeneidad de intervenciones y contextos.",
            url: "https://pubmed.ncbi.nlm.nih.gov/25896377/"
          }
        ]
      }
    ]
  },
  "mindfulness-y-espiritualidad": {
    title: "Mindfulness y espiritualidad",
    summary:
      "Mindfulness puede ayudar a atencion, estres y regulacion emocional, pero no es una cura universal. Su version comercial a veces individualiza problemas estructurales y promete transformaciones que la evidencia no sostiene.",
    whyTrending:
      "Apps, terapia, escuelas, empresas y creadores de bienestar lo presentan como antidoto rapido para ansiedad, productividad y vacio existencial.",
    status: "Ficha editorial con evidencia moderada para estres y sintomas leves",
    support: [
      {
        title: "Tiene evidencia moderada para estres, ansiedad y bienestar en algunos contextos",
        evidence: "Moderada",
        consensus: "Medio",
        explanation:
          "Programas estructurados como MBSR han mostrado beneficios modestos en estres, ansiedad y dolor cronico. La clave es que son intervenciones practicadas con cierta regularidad, no solo consumir contenido espiritual.",
        strengths: ["Bajo coste y aplicable en muchos contextos", "Ayuda a observar pensamientos sin fusionarse con ellos"],
        limitations: ["Efectos medios modestos", "Calidad variable de estudios y profesores"],
        counterarguments: ["Para trastornos graves puede ser insuficiente o incluso incomodo sin guia clinica"],
        relatedConcepts: ["Atencion", "Regulacion emocional", "MBSR", "Aceptacion"],
        resources: [
          {
            title: "Meditation Programs for Psychological Stress and Well-being",
            authors: "Goyal et al.",
            year: 2014,
            journal: "JAMA Internal Medicine",
            studyType: "Metaanalisis",
            participants: "47 ensayos clinicos, 3515 participantes",
            summary: "Encuentra evidencia moderada de mejora en ansiedad, depresion y dolor, con efectos modestos.",
            limitations: "Muchos estudios con limitaciones metodologicas y comparadores variables.",
            url: "https://jamanetwork.com/journals/jamainternalmedicine/fullarticle/1809754"
          }
        ]
      }
    ],
    opposition: [
      {
        title: "Puede convertirse en anestesia individual para problemas sociales",
        evidence: "Baja",
        consensus: "Disputado",
        explanation:
          "Criticos del 'McMindfulness' sostienen que algunas empresas usan mindfulness para adaptar al individuo a entornos estresantes sin cambiar causas: precariedad, sobrecarga, mal liderazgo o aislamiento.",
        strengths: ["Introduce contexto social y laboral", "Evita culpabilizar a quien no se calma"],
        limitations: ["La critica cultural tiene menos evidencia experimental directa", "No invalida beneficios clinicos reales"],
        counterarguments: ["Una herramienta individual puede ser util aunque no resuelva todo el sistema"],
        relatedConcepts: ["McMindfulness", "Burnout", "Responsabilidad estructural"],
        resources: [
          {
            title: "McMindfulness: How Mindfulness Became the New Capitalist Spirituality",
            authors: "Purser",
            year: 2019,
            journal: "Repeater Books",
            studyType: "Opinion",
            participants: "Ensayo critico",
            summary: "Critica la apropiacion corporativa y despolitizada del mindfulness.",
            limitations: "Ensayo argumentativo; no metaanalisis clinico.",
            url: "https://repeaterbooks.com/product/mcmindfulness-how-mindfulness-became-the-new-capitalist-spirituality/"
          }
        ]
      }
    ]
  },
  "colonialismo-y-memoria-historica": {
    title: "Colonialismo y memoria historica",
    summary:
      "La memoria colonial no consiste solo en juzgar el pasado con valores actuales. Tambien pregunta quien fue obligado a callar, que riquezas circularon, que archivos faltan, que monumentos celebran violencia y como una sociedad madura cuenta su historia sin propaganda.",
    whyTrending:
      "Museos, estatuas, curriculos escolares, reparaciones y debates sobre imperios aparecen una y otra vez en redes, donde la historia se usa como identidad, acusacion o defensa nacional.",
    status: "Ficha editorial basada en historiografia, patrimonio y estudios de memoria",
    support: [
      {
        title: "Revisar la memoria publica puede corregir silencios y jerarquias heredadas",
        evidence: "Alta",
        consensus: "Alto",
        explanation:
          "Monumentos, museos y manuales no son el pasado: son decisiones presentes sobre que recordar y que admirar. Incorporar esclavitud, extractivismo, violencia, resistencia y voces colonizadas no borra la historia; la hace mas completa y menos celebratoria.",
        strengths: ["Distingue investigacion historica de orgullo nacional", "Permite incluir archivos y testimonios ignorados"],
        limitations: ["Puede convertirse en gesto simbolico sin cambios materiales", "La memoria publica no sustituye investigacion historica rigurosa"],
        counterarguments: ["Cambiar simbolos no repara automaticamente desigualdades actuales"],
        relatedConcepts: ["Memoria colectiva", "Patrimonio", "Reparacion", "Archivo"],
        resources: [
          {
            title: "Silencing the Past: Power and the Production of History",
            authors: "Michel-Rolph Trouillot",
            year: 1995,
            journal: "Beacon Press",
            studyType: "Opinion",
            participants: "Analisis historico y teorico sobre produccion de relatos",
            summary: "Explica como el poder interviene en que hechos se registran, narran y recuerdan.",
            limitations: "Obra teorica e historica, no metaanalisis empirico.",
            url: "https://www.beacon.org/Silencing-the-Past-P692.aspx"
          },
          {
            title: "Report on the restitution of African cultural heritage",
            authors: "Sarr, Savoy",
            year: 2018,
            journal: "French Ministry of Culture",
            studyType: "Revision sistematica",
            participants: "Analisis de colecciones, expolio y restitucion patrimonial",
            summary: "Plantea criterios para discutir restitucion de patrimonio africano en museos europeos.",
            limitations: "Centrado en un encargo politico y en colecciones africanas en Francia.",
            url: "https://www.culture.gouv.fr/Thematiques/Europe-et-international/Actualites/Rapport-sur-la-restitution-du-patrimoine-culturel-africain"
          }
        ]
      }
    ],
    opposition: [
      {
        title: "La memoria puede volverse moralismo simplificador si sustituye contexto por culpa",
        evidence: "Moderada",
        consensus: "Medio",
        explanation:
          "El riesgo es reducir siglos de historia a una escena de buenos y malos, usar categorias actuales sin cuidado o tratar a grupos enteros como herederos morales automaticos. La buena historia explica estructuras, intereses y violencia sin negar agencia ni complejidad.",
        strengths: ["Evita presentismo y propaganda inversa", "Protege la investigacion de consignas faciles"],
        limitations: ["La llamada a la complejidad puede usarse para no cambiar nada", "No todo desacuerdo es rigor historico; a veces es defensa identitaria"],
        counterarguments: ["Reconocer violencia colonial no impide estudiar ambivalencias, mezclas y contextos"],
        relatedConcepts: ["Presentismo", "Nacionalismo", "Contexto", "Complejidad"],
        resources: [
          {
            title: "The History Manifesto",
            authors: "Guldi, Armitage",
            year: 2014,
            journal: "Cambridge University Press",
            studyType: "Opinion",
            participants: "Ensayo historiografico sobre escala temporal y uso publico de historia",
            summary: "Defiende pensar historicamente con escalas largas y cuidado metodologico.",
            limitations: "Es una intervencion historiografica, no una guia especifica sobre colonialismo.",
            url: "https://www.cambridge.org/core/books/history-manifesto/67A45A0D14908C4A1D042D962CC62E23"
          }
        ]
      }
    ],
    known: [
      "La memoria publica siempre selecciona: no existe un relato completamente neutral.",
      "Colonialismo incluye violencia, administracion, comercio, cultura, resistencia y mezclas.",
      "Restitucion, reparacion y educacion son debates distintos aunque relacionados."
    ],
    unknown: [
      "Que reparaciones producen justicia material y no solo simbolismo.",
      "Como narrar historia compartida sin borrar responsabilidad ni agencia local.",
      "Como decidir sobre monumentos cuando una sociedad plural no comparte el mismo recuerdo."
    ],
    biases: ["Presentismo", "Nostalgia nacional", "Culpa heredada", "Seleccion de evidencia"]
  },
  "apropiacion-cultural": {
    title: "Apropiacion cultural",
    summary:
      "No todo intercambio cultural es apropiacion danina. La pregunta util es concreta: hay erasure, explotacion, burla, lucro sin reconocimiento o uso de simbolos sagrados fuera de contexto? Sin esas preguntas, el debate se vuelve policia estetica.",
    whyTrending:
      "Peinados, comida, musica, moda, disfraces, tatuajes, IA generativa y turismo cultural se viralizan como acusaciones o defensas de libertad creativa.",
    status: "Ficha editorial basada en teoria cultural, etica y debates de poder simbolico",
    support: [
      {
        title: "Puede nombrar danos reales: borrado, explotacion y trivializacion",
        evidence: "Moderada",
        consensus: "Medio",
        explanation:
          "Cuando una cultura dominante convierte elementos de una comunidad subordinada en moda, producto o exotismo, puede borrar origen, significado y voces de quienes sostienen esa practica. El problema aumenta si la comunidad original fue castigada por lo mismo que luego otros monetizan.",
        strengths: ["Introduce poder historico y contexto, no solo gusto personal", "Distingue homenaje de lucro extractivo"],
        limitations: ["El dano puede ser dificil de medir", "Las comunidades no siempre tienen una sola voz sobre que usos son respetuosos"],
        counterarguments: ["La circulacion cultural tambien produce mezcla, innovacion y solidaridad"],
        relatedConcepts: ["Borrado", "Explotacion", "Exotizacion", "Reconocimiento"],
        resources: [
          {
            title: "Who Owns Culture? Appropriation and Authenticity in American Law",
            authors: "Susan Scafidi",
            year: 2005,
            journal: "Rutgers University Press",
            studyType: "Opinion",
            participants: "Analisis juridico y cultural",
            summary: "Examina propiedad, autenticidad y proteccion de expresiones culturales.",
            limitations: "Marco juridico-cultural estadounidense, no criterio universal.",
            url: "https://www.rutgersuniversitypress.org/who-owns-culture/9780813536064"
          },
          {
            title: "On appropriation. A critical reappraisal of the concept and its application in global art practices",
            authors: "Arnd Schneider",
            year: 2003,
            journal: "Social Anthropology",
            studyType: "Opinion",
            participants: "Analisis antropologico y artistico",
            summary: "Revisa usos del concepto de apropiacion en practicas artisticas globales.",
            limitations: "Ensayo teorico; no ofrece mediciones de dano social.",
            url: "https://doi.org/10.1111/j.1469-8676.2003.tb00076.x"
          }
        ]
      }
    ],
    opposition: [
      {
        title: "Usado sin precision, el concepto puede castigar intercambio y creatividad",
        evidence: "Moderada",
        consensus: "Medio",
        explanation:
          "Las culturas nunca han sido recipientes cerrados. Musica, cocina, lenguaje y religion cambian por contacto, migracion, imitacion y mezcla. Si toda influencia se trata como robo, se empobrece la libertad creativa y se refuerza una vision esencialista de la identidad.",
        strengths: ["Defiende hibridacion cultural y libertad artistica", "Evita convertir identidades en propiedad fija"],
        limitations: ["Puede ignorar desigualdades reales de credito, mercado y prestigio", "No todo intercambio ocurre en condiciones justas"],
        counterarguments: ["La critica no necesita prohibir: puede pedir credito, contexto, permiso o redistribucion"],
        relatedConcepts: ["Hibridacion", "Esencialismo", "Libertad artistica", "Credito"],
        resources: [
          {
            title: "The Ethics of Identity",
            authors: "Kwame Anthony Appiah",
            year: 2005,
            journal: "Princeton University Press",
            studyType: "Opinion",
            participants: "Filosofia moral y politica sobre identidad",
            summary: "Defiende identidades abiertas y advierte contra convertir culturas en jaulas normativas.",
            limitations: "No aborda todos los casos especificos de apropiacion comercial.",
            url: "https://press.princeton.edu/books/paperback/9780691130286/the-ethics-of-identity"
          }
        ]
      }
    ],
    known: [
      "Intercambio cultural y apropiacion danina no son lo mismo.",
      "Poder historico, lucro, contexto y reconocimiento cambian la evaluacion moral.",
      "Una comunidad puede estar internamente dividida sobre que usos son aceptables."
    ],
    unknown: [
      "Como traducir danos simbolicos en reglas justas para moda, musica o IA.",
      "Quien puede dar permiso cuando una cultura no tiene autoridad unica.",
      "Cuando una critica publica educa y cuando solo produce miedo a crear."
    ],
    biases: ["Esencialismo cultural", "Senalizacion moral", "Defensividad", "Falso dilema"]
  },
  "poliamor-y-monogamia": {
    title: "Poliamor y monogamia",
    summary:
      "La evidencia no demuestra que una estructura sea superior para todo el mundo. Lo que predice bienestar suele ser consentimiento real, comunicacion, apego, honestidad, gestion de celos, compatibilidad y ausencia de coercion.",
    whyTrending:
      "TikTok e Instagram han convertido el poliamor, las relaciones abiertas, la monogamia consciente y los celos en contenido de identidad: libertad radical para unos, caos emocional para otros.",
    status: "Ficha editorial basada en investigacion sobre no monogamia consensuada y satisfaccion relacional",
    support: [
      {
        title: "La no monogamia consensuada puede ser satisfactoria cuando hay acuerdos claros",
        evidence: "Moderada",
        consensus: "Medio",
        explanation:
          "Los estudios comparativos no encuentran una superioridad simple de la monogamia en satisfaccion relacional o sexual. Para algunas personas, el poliamor permite honestidad sobre deseo, redes de apoyo y relaciones menos basadas en propiedad. Pero funciona peor si se usa para evitar conversaciones dificiles.",
        strengths: ["Separa no monogamia consensuada de infidelidad", "Desmonta la idea de que solo la monogamia puede ser adulta o estable"],
        limitations: ["Muchas muestras son autoseleccionadas y occidentales", "Quienes participan en estudios pueden estar mas integrados en comunidades poliamorosas"],
        counterarguments: ["Que pueda funcionar no significa que sea facil ni adecuado para cualquiera"],
        relatedConcepts: ["Consentimiento", "Acuerdos", "Compersion", "Apego"],
        resources: [
          {
            title: "Relationship and sexual satisfaction in consensually non-monogamous and monogamous relationships",
            authors: "Anderson et al.",
            year: 2025,
            journal: "The Journal of Sex Research",
            studyType: "Metaanalisis",
            participants: "35 estudios y mas de 24.000 participantes",
            summary: "Encuentra diferencias globales no significativas en satisfaccion relacional y sexual entre relaciones monogamas y no monogamas consensuadas.",
            limitations: "Incluye estudios autoinformados y muestras no siempre representativas.",
            url: "https://www.tandfonline.com/journals/hjsr20"
          }
        ]
      }
    ],
    opposition: [
      {
        title: "Mas libertad tambien puede significar mas complejidad emocional y desigualdad de poder",
        evidence: "Moderada",
        consensus: "Medio",
        explanation:
          "El poliamor exige negociar tiempo, sexo, prioridades, seguridad, celos y jerarquias. Si una persona acepta por miedo a perder la relacion, no hay libertad real. Y si se idealiza la comunicacion infinita, quien tiene mas poder, carisma o recursos puede imponer sus deseos como si fueran madurez emocional.",
        strengths: ["Introduce consentimiento material, no solo verbal", "Reconoce carga emocional y gestion de acuerdos"],
        limitations: ["La monogamia tambien puede contener coercion, celos y desigualdad", "No toda complejidad implica dano"],
        counterarguments: ["Buenos acuerdos, apoyo comunitario y terapia informada pueden reducir riesgos"],
        relatedConcepts: ["Celos", "Coercion", "Jerarquia", "Seguridad emocional"],
        resources: [
          {
            title: "Desire, Familiarity, and Engagement in Polyamory",
            authors: "Moors, Gesselman, Garcia",
            year: 2021,
            journal: "Frontiers in Psychology",
            studyType: "Observacional",
            participants: "3.438 adultos solteros en Estados Unidos",
            summary: "Estima familiaridad, deseo y experiencia con poliamor, mostrando que el interes es mas comun de lo que suele asumirse.",
            limitations: "No mide exito relacional a largo plazo ni representa todas las culturas.",
            url: "https://www.frontiersin.org/articles/10.3389/fpsyg.2021.619640/full"
          }
        ]
      }
    ],
    known: [
      "No monogamia consensuada e infidelidad son fenomenos distintos.",
      "La estructura relacional no sustituye habilidades de comunicacion y cuidado.",
      "El consentimiento debe ser reversible, informado y libre de presion."
    ],
    unknown: [
      "Que efectos aparecen a largo plazo en familias, crianza y redes de cuidado.",
      "Como influyen edad, cultura, clase social y comunidad de apoyo.",
      "Que personas confunden libertad relacional con evitacion del compromiso."
    ],
    biases: ["Mononormatividad", "Sesgo de novedad", "Romanticismo", "Aversion a la perdida"]
  },
  "meritocracia": {
    title: "Meritocracia",
    summary:
      "La meritocracia es atractiva porque promete que esfuerzo y talento importan. Su punto ciego es que suerte, herencia, salud, barrio, contactos, discriminacion y capital familiar influyen antes de que empiece la carrera.",
    whyTrending:
      "Aparece en debates sobre influencers ricos, oposiciones, universidad, emprendimiento, pobreza, herencia, impuestos y discurso de 'si quieres, puedes'.",
    status: "Ficha editorial de filosofia politica y sociologia",
    support: [
      {
        title: "Reconocer esfuerzo y competencia puede ser socialmente valioso",
        evidence: "Moderada",
        consensus: "Medio",
        explanation:
          "Un sistema que ignora por completo merito, preparacion o responsabilidad individual puede volverse arbitrario. La idea meritocratica protege una intuicion justa: no todo debe depender de apellido, casta o favor politico.",
        strengths: ["Defiende agencia personal", "Critica privilegios heredados y clientelismo"],
        limitations: ["Puede exagerar cuanto control tiene cada persona sobre su punto de partida", "No define que cuenta como merito"],
        counterarguments: ["Una meritocracia real exigiria igualar mucho mas las oportunidades iniciales"],
        relatedConcepts: ["Agencia", "Igualdad de oportunidades", "Responsabilidad"],
        resources: [
          {
            title: "A Theory of Justice",
            authors: "John Rawls",
            year: 1971,
            journal: "Harvard University Press",
            studyType: "Opinion",
            participants: "Obra de filosofia politica",
            summary: "Discute justicia, igualdad de oportunidades y como tratar desigualdades moralmente arbitrarias.",
            limitations: "Argumento filosofico, no estudio empirico.",
            url: "https://plato.stanford.edu/entries/rawls/"
          }
        ]
      }
    ],
    opposition: [
      {
        title: "Puede convertir privilegio en virtud y pobreza en culpa",
        evidence: "Alta",
        consensus: "Alto",
        explanation:
          "Cuando una sociedad se llama meritocratica, quienes ganan tienden a verse como merecedores y quienes pierden como culpables. Eso oculta desigualdades de origen y erosiona solidaridad, incluso cuando el esfuerzo individual tambien importa.",
        strengths: ["Explica efectos psicologicos y politicos del relato meritocratico", "Conecta movilidad social con dignidad"],
        limitations: ["Puede infravalorar diferencias reales de esfuerzo o disciplina", "No ofrece por si sola un sistema alternativo completo"],
        counterarguments: ["La critica al mito meritocratico no implica negar responsabilidad personal"],
        relatedConcepts: ["Suerte moral", "Capital cultural", "Movilidad social", "Dignidad"],
        resources: [
          {
            title: "The Tyranny of Merit",
            authors: "Michael J. Sandel",
            year: 2020,
            journal: "Farrar, Straus and Giroux",
            studyType: "Opinion",
            participants: "Ensayo de filosofia politica",
            summary: "Argumenta que la retorica meritocratica genera arrogancia entre ganadores y humillacion entre perdedores.",
            limitations: "Ensayo normativo; debe complementarse con datos de movilidad social.",
            url: "https://www.hup.harvard.edu/books/9780674983359"
          },
          {
            title: "A Broken Social Elevator? How to Promote Social Mobility",
            authors: "OECD",
            year: 2018,
            journal: "OECD Publishing",
            studyType: "Observacional",
            participants: "Datos comparados de movilidad social",
            summary: "Analiza persistencia intergeneracional de ingresos y barreras a movilidad social.",
            limitations: "Datos agregados por pais; no resuelven debates normativos por si solos.",
            url: "https://www.oecd.org/social/soc/Social-mobility-2018-Overview-MainFindings.pdf"
          }
        ]
      }
    ]
  },
  "microbiota-y-salud-mental": {
    title: "Microbiota y salud mental",
    summary:
      "El intestino y el cerebro se comunican mediante vias nerviosas, inmunes y metabolicas. Esa relacion es real, pero todavia no permite diagnosticar ni tratar depresion eligiendo un probiotico generico.",
    whyTrending:
      "El concepto de 'segundo cerebro' se ha mezclado en redes con tests comerciales, dietas de eliminacion, suplementos y promesas de curar ansiedad o depresion desde el intestino.",
    status: "Ficha editorial con mecanismo biologico plausible y eficacia clinica todavia incierta",
    support: [
      {
        title: "Existe un eje intestino-cerebro biologicamente plausible",
        evidence: "Alta",
        consensus: "Alto",
        explanation:
          "Microbiota, sistema inmune, metabolitos y nervio vago participan en una comunicacion bidireccional. Ademas, varios estudios encuentran diferencias medias en la microbiota de personas con depresion. Eso justifica investigar el mecanismo, pero una diferencia de composicion no demuestra que las bacterias sean la causa.",
        strengths: ["Integra mecanismos nerviosos, inmunes y metabolicos", "Hay resultados convergentes en modelos animales y estudios humanos"],
        limitations: ["Dieta, medicacion, sueno y enfermedad tambien alteran la microbiota", "No existe una firma microbiana diagnostica estable"],
        counterarguments: ["La depresion puede cambiar dieta y microbiota, produciendo causalidad inversa"],
        relatedConcepts: ["Eje intestino-cerebro", "Causalidad inversa", "Inflamacion", "Metabolitos"],
        resources: [
          {
            title: "Gut microbiota and major depressive disorder: a systematic review and meta-analysis",
            authors: "Sanada et al.",
            year: 2020,
            journal: "Journal of Affective Disorders",
            studyType: "Metaanalisis",
            participants: "Estudios observacionales e intervenciones con probioticos",
            summary: "Sintetiza diferencias microbianas asociadas a depresion y resultados iniciales de intervenciones.",
            limitations: "Gran heterogeneidad entre muestras, tecnicas y especies bacterianas estudiadas.",
            url: "https://pubmed.ncbi.nlm.nih.gov/32056863/"
          }
        ]
      }
    ],
    opposition: [
      {
        title: "Los probioticos no son un tratamiento establecido para la depresion",
        evidence: "Alta",
        consensus: "Alto",
        explanation:
          "Los ensayos muestran resultados prometedores pero pequenos, variables y dependientes de cepa, dosis y poblacion. Las revisiones no consideran la evidencia suficientemente fuerte para incluir estas intervenciones en guias de tratamiento de depresion.",
        strengths: ["Evita sustituir terapias eficaces por suplementos", "Distingue mecanismo plausible de eficacia clinica"],
        limitations: ["La investigacion evoluciona y algunas cepas concretas podrian resultar utiles", "Los promedios pueden ocultar subgrupos respondedores"],
        counterarguments: ["Como complemento supervisado, algunas intervenciones dieteticas pueden aportar beneficios generales"],
        relatedConcepts: ["Psicobioticos", "Cepa", "Efecto placebo", "Guia clinica"],
        resources: [
          {
            title: "The effect of interventions targeting gut microbiota on depressive symptoms",
            authors: "Hofmeister et al.",
            year: 2021,
            journal: "CMAJ Open",
            studyType: "Metaanalisis",
            participants: "Ensayos aleatorizados con probioticos, prebioticos y simbioticos",
            summary: "Encuentra indicios de beneficio, pero concluye que aun no hay evidencia robusta para recomendar su inclusion en guias.",
            limitations: "Ensayos pequenos, intervenciones heterogeneas y seguimiento corto.",
            url: "https://pubmed.ncbi.nlm.nih.gov/34933877/"
          }
        ]
      }
    ],
    known: [
      "La comunicacion intestino-cerebro es bidireccional.",
      "Asociacion microbiana no equivale a causa ni a tratamiento.",
      "Cepa, dosis, dieta y poblacion impiden hablar de 'los probioticos' como una sola intervencion."
    ],
    unknown: [
      "Que perfiles responderian a una cepa o dieta concreta.",
      "Si los efectos se mantienen a largo plazo.",
      "Que biomarcadores permitirian personalizar una intervencion."
    ]
  },
  "deberes-escolares": {
    title: "Deberes escolares",
    summary:
      "Los deberes pueden reforzar aprendizaje, sobre todo en secundaria, cuando tienen un objetivo claro, carga limitada y feedback. Su cantidad por si sola no garantiza aprender y puede ampliar desigualdades.",
    whyTrending:
      "Familias y docentes discuten en redes si los deberes crean disciplina o roban infancia, mientras proliferan rutinas de estudio, academias y contenido de productividad escolar.",
    status: "Ficha editorial con efecto medio positivo y evidencia de baja seguridad",
    support: [
      {
        title: "Los deberes bien conectados con clase pueden mejorar el aprendizaje",
        evidence: "Moderada",
        consensus: "Medio",
        explanation:
          "Las sintesis educativas encuentran un efecto positivo medio, mayor en secundaria que en primaria. Funcionan mejor cuando practican contenidos ya explicados, el proposito es visible y el alumno recibe feedback.",
        strengths: ["Puede consolidar practica y recuperacion de memoria", "Tiene bajo coste material"],
        limitations: ["El promedio mezcla tareas muy distintas", "La base incluye pocos ensayos aleatorizados"],
        counterarguments: ["Una tarea mal disenada puede consumir tiempo sin producir aprendizaje"],
        relatedConcepts: ["Practica de recuperacion", "Feedback", "Autorregulacion"],
        resources: [
          {
            title: "Homework: Teaching and Learning Toolkit",
            authors: "Education Endowment Foundation",
            year: 2026,
            journal: "EEF Evidence Toolkit",
            studyType: "Revision sistematica",
            participants: "43 estudios incluidos en la sintesis",
            summary: "Estima impacto medio positivo, especialmente en secundaria, y destaca calidad, vinculacion con clase y feedback.",
            limitations: "La propia EEF califica la seguridad de la evidencia como baja.",
            url: "https://educationendowmentfoundation.org.uk/education-evidence/teaching-learning-toolkit/homework"
          }
        ]
      }
    ],
    opposition: [
      {
        title: "Mas deberes no significa mas aprendizaje",
        evidence: "Moderada",
        consensus: "Medio",
        explanation:
          "El beneficio disminuye cuando aumenta excesivamente el tiempo. Cargas largas pueden desplazar sueno, juego, deporte y vida familiar; ademas, presuponen espacio tranquilo, dispositivos y ayuda disponibles en casa.",
        strengths: ["Introduce bienestar y coste de oportunidad", "Visibiliza desigualdad de recursos familiares"],
        limitations: ["No justifica eliminar toda practica fuera del aula", "Los efectos varian mucho por edad y asignatura"],
        counterarguments: ["El centro puede ofrecer clubes de deberes y materiales para reducir desigualdad"],
        relatedConcepts: ["Desigualdad", "Carga cognitiva", "Sueno", "Coste de oportunidad"],
        resources: [
          {
            title: "Homework: evidence, implementation and disadvantage",
            authors: "Education Endowment Foundation",
            year: 2026,
            journal: "EEF Evidence Toolkit",
            studyType: "Revision sistematica",
            participants: "Sintesis de estudios de primaria y secundaria",
            summary: "Advierte que la calidad importa mas que la cantidad y recomienda apoyar a alumnos sin condiciones adecuadas en casa.",
            limitations: "No identifica una duracion universal optima.",
            url: "https://educationendowmentfoundation.org.uk/education-evidence/teaching-learning-toolkit/homework"
          }
        ]
      }
    ],
    known: [
      "El efecto medio es mayor en secundaria que en primaria.",
      "Proposito, calidad y feedback importan mas que acumular minutos.",
      "Las condiciones del hogar modifican la utilidad real de una tarea."
    ],
    unknown: [
      "Que carga es optima para cada edad y materia.",
      "Que formatos digitales ayudan sin aumentar distraccion.",
      "Como medir aprendizaje y bienestar simultaneamente."
    ]
  },
  "trabajo-remoto": {
    title: "Trabajo remoto e hibrido",
    summary:
      "No existe una respuesta unica: el resultado depende de tarea, autonomia, hogar, coordinacion y cultura. La evidencia mas fuerte favorece modelos hibridos bien organizados para muchos trabajos de conocimiento.",
    whyTrending:
      "Los mandatos de vuelta a la oficina chocan con trabajadores que valoran flexibilidad, mientras empresas discuten productividad, innovacion, control y coste inmobiliario.",
    status: "Ficha editorial con evidencia causal fuerte para un modelo hibrido concreto",
    support: [
      {
        title: "Dos dias remotos pueden mejorar retencion sin reducir rendimiento",
        evidence: "Alta",
        consensus: "Alto",
        explanation:
          "Un ensayo aleatorizado de seis meses con 1.612 empleados encontro mayor satisfaccion y un tercio menos de bajas voluntarias en el grupo hibrido. No detecto empeoramiento en evaluaciones, promociones ni lineas de codigo durante el seguimiento.",
        strengths: ["Diseno aleatorizado y muestra grande", "Incluye resultados empresariales y de empleados"],
        limitations: ["Una empresa tecnologica china no representa todos los sectores", "Evalua dos dias en casa, no remoto total"],
        counterarguments: ["Los efectos pueden ser distintos en personal nuevo, creativo, operativo o con mala vivienda"],
        relatedConcepts: ["Retencion", "Autonomia", "Productividad", "Desplazamiento"],
        resources: [
          {
            title: "Hybrid working from home improves retention without damaging performance",
            authors: "Bloom, Han, Liang",
            year: 2024,
            journal: "Nature",
            studyType: "Ensayo clinico",
            participants: "1.612 empleados de una empresa tecnologica",
            summary: "El trabajo hibrido mejoro satisfaccion y redujo dimisiones sin dano medible en rendimiento o promociones.",
            limitations: "Una sola empresa y ocupaciones con titulacion universitaria.",
            url: "https://www.nature.com/articles/s41586-024-07500-2"
          }
        ]
      }
    ],
    opposition: [
      {
        title: "La distancia puede debilitar colaboracion espontanea y aprendizaje informal",
        evidence: "Moderada",
        consensus: "Medio",
        explanation:
          "Las tareas concentradas se benefician de menos interrupciones, pero ideacion, incorporacion de nuevos empleados y coordinacion compleja pueden necesitar presencia sincronizada. El problema suele ser menos 'casa u oficina' que diseñar cuando y para que se reune el equipo.",
        strengths: ["Distingue productividad individual de colaboracion", "Explica por que la politica debe adaptarse a tareas"],
        limitations: ["La proximidad no garantiza buena colaboracion", "Muchos datos son observacionales"],
        counterarguments: ["Dias comunes de equipo y documentacion explicita reducen parte del coste"],
        relatedConcepts: ["Conocimiento tacito", "Creatividad", "Onboarding", "Coordinacion"],
        resources: [
          {
            title: "What science says about hybrid working",
            authors: "David Adam",
            year: 2024,
            journal: "Nature",
            studyType: "Revision sistematica",
            participants: "Sintesis de estudios sobre ciencia, creatividad y colaboracion",
            summary: "Resume beneficios y limites del trabajo hibrido segun tareas, equipos y diseño organizativo.",
            limitations: "Articulo de sintesis, no una estimacion causal unica.",
            url: "https://www.nature.com/articles/d41586-024-00643-2"
          }
        ]
      }
    ],
    known: [
      "El modelo hibrido puede reducir rotacion sin dañar rendimiento en ciertos trabajos.",
      "La tarea y la calidad de gestion importan mas que una politica universal.",
      "Productividad individual, innovacion y cohesion no son la misma variable."
    ],
    unknown: [
      "Efectos de largo plazo sobre carrera y promocion en distintos grupos.",
      "Como afecta a trabajadores jovenes que necesitan aprendizaje informal.",
      "Que frecuencia presencial optimiza cada tipo de equipo."
    ]
  },
  "cambio-climatico-y-responsabilidad-individual": {
    title: "Cambio climatico: accion individual o cambio sistemico",
    summary:
      "Las decisiones personales pueden reducir emisiones y cambiar normas sociales, pero solo alcanzan escala cuando infraestructura, precios, empresas y politica hacen posibles las opciones bajas en carbono.",
    whyTrending:
      "El debate viral enfrenta la culpa por vuelos, carne o consumo con la responsabilidad de petroleras y gobiernos, como si actuar individual y colectivamente fueran alternativas.",
    status: "Ficha editorial basada en sintesis del IPCC",
    support: [
      {
        title: "Los cambios de demanda tienen un potencial climatico importante",
        evidence: "Alta",
        consensus: "Alto",
        explanation:
          "El IPCC estima que estrategias de demanda en edificios, transporte y alimentacion pueden reducir emisiones de forma sustancial para 2050. Viajar menos en coche, eficiencia, dietas con menor huella y reducir desperdicio cuentan, especialmente entre personas con consumo alto.",
        strengths: ["Conecta acciones con sectores concretos", "Reconoce que la capacidad de reducir no es igual para todos"],
        limitations: ["El potencial supone infraestructura y politicas habilitadoras", "Una lista de habitos no sustituye cambios industriales"],
        counterarguments: ["Centrarse en consumidores puede distraer de productores y reguladores"],
        relatedConcepts: ["Demanda", "Suficiencia", "Huella", "Normas sociales"],
        resources: [
          {
            title: "AR6 WGIII Chapter 5: Demand, services and social aspects",
            authors: "Intergovernmental Panel on Climate Change",
            year: 2022,
            journal: "IPCC Sixth Assessment Report",
            studyType: "Revision sistematica",
            participants: "Sintesis internacional de literatura climatica",
            summary: "Evalua potencial, bienestar y condiciones de estrategias de demanda en movilidad, edificios, alimentacion y consumo.",
            limitations: "Los potenciales son escenarios agregados, no una prediccion individual.",
            url: "https://www.ipcc.ch/report/ar6/wg3/chapter/chapter-5/"
          }
        ]
      }
    ],
    opposition: [
      {
        title: "La voluntad individual no compensa sistemas intensivos en carbono",
        evidence: "Alta",
        consensus: "Alto",
        explanation:
          "Una persona no puede elegir un tren inexistente, aislar una vivienda que no posee o comprar energia limpia sin oferta. Regulacion, redes electricas, urbanismo, industria y fiscalidad determinan el menu de decisiones disponible.",
        strengths: ["Evita culpabilizar a quien tiene pocas opciones", "Dirige atencion a palancas de gran escala"],
        limitations: ["Puede convertirse en excusa para no cambiar nada personalmente", "Los sistemas tambien responden a votos, demanda y normas"],
        counterarguments: ["La accion individual puede ser politica: organizarse, votar y normalizar alternativas"],
        relatedConcepts: ["Infraestructura", "Accion colectiva", "Justicia climatica", "Regulacion"],
        resources: [
          {
            title: "Climate Change 2022: Mitigation of Climate Change",
            authors: "Intergovernmental Panel on Climate Change",
            year: 2022,
            journal: "IPCC Sixth Assessment Report",
            studyType: "Revision sistematica",
            participants: "Evaluacion global de opciones de mitigacion",
            summary: "Situa el comportamiento dentro de transformaciones tecnologicas, institucionales y sociales, no como sustituto de ellas.",
            limitations: "No prescribe una politica unica para cada pais.",
            url: "https://www.ipcc.ch/report/ar6/wg3/"
          }
        ]
      }
    ],
    known: [
      "Accion individual y cambio sistemico se refuerzan cuando estan bien alineados.",
      "Las personas con mayor consumo tienen mas capacidad y responsabilidad de reducir.",
      "Infraestructura y politica condicionan fuertemente las decisiones disponibles."
    ],
    unknown: [
      "Que combinacion de incentivos y normas mantiene cambios en el tiempo.",
      "Como repartir costes de transicion sin aumentar desigualdad.",
      "Cuando una accion visible inspira cambio y cuando provoca rechazo."
    ]
  },
  "ia-generativa-en-educacion": {
    title: "IA generativa en educacion",
    summary:
      "La IA puede actuar como tutor, interlocutor y apoyo para escribir, pero tambien permite delegar justo el esfuerzo cognitivo que produce aprendizaje. Su valor depende de la tarea, la edad, la supervision y la evaluacion.",
    whyTrending:
      "Estudiantes ya la usan para resumir, resolver y redactar mientras escuelas y universidades intentan distinguir ayuda, aprendizaje, plagio y nuevas competencias.",
    status: "Ficha editorial con potencial pedagogico claro y evidencia longitudinal todavia limitada",
    support: [
      {
        title: "Puede ampliar acceso a explicaciones y feedback inmediato",
        evidence: "Moderada",
        consensus: "Medio",
        explanation:
          "Un asistente bien guiado puede adaptar ejemplos, proponer preguntas, traducir conceptos y dar feedback cuando un docente no esta disponible. El beneficio aumenta cuando la IA pregunta y orienta en vez de entregar directamente el resultado.",
        strengths: ["Reduce barreras de idioma y horario", "Permite practicar con feedback frecuente"],
        limitations: ["Puede producir errores convincentes", "Acceso y alfabetizacion digital son desiguales"],
        counterarguments: ["Una respuesta disponible no garantiza comprension ni transferencia"],
        relatedConcepts: ["Tutoria", "Feedback", "Andamiaje", "Accesibilidad"],
        resources: [
          {
            title: "Guidance for generative AI in education and research",
            authors: "Miao, Holmes; UNESCO",
            year: 2023,
            journal: "UNESCO",
            studyType: "Revision sistematica",
            participants: "Sintesis internacional de usos, riesgos y politicas",
            summary: "Propone un enfoque humano, apropiado para la edad y validado pedagogicamente.",
            limitations: "Guia normativa en un campo con evidencia empirica todavia emergente.",
            url: "https://www.unesco.org/en/articles/guidance-generative-ai-education-and-research"
          }
        ]
      }
    ],
    opposition: [
      {
        title: "Delegar la respuesta puede sustituir el proceso que enseña a pensar",
        evidence: "Moderada",
        consensus: "Medio",
        explanation:
          "Redactar, recordar, equivocarse y revisar forman parte del aprendizaje. Si el alumno solo selecciona una respuesta fluida, puede obtener un producto mejor sin construir conocimiento, criterio para verificarlo ni capacidad de hacerlo sin ayuda.",
        strengths: ["Distingue calidad del producto y aprendizaje", "Explica el riesgo de dependencia cognitiva"],
        limitations: ["El efecto depende del diseño de la actividad", "Aun faltan seguimientos largos"],
        counterarguments: ["La calculadora y el buscador tambien desplazaron tareas sin eliminar todo aprendizaje"],
        relatedConcepts: ["Descarga cognitiva", "Metacognicion", "Evaluacion autentica", "Alucinacion"],
        resources: [
          {
            title: "Critical Thinking and Generative Artificial Intelligence",
            authors: "Conrad Hughes",
            year: 2024,
            journal: "UNESCO International Bureau of Education",
            studyType: "Opinion",
            participants: "Analisis pedagogico",
            summary: "Defiende que la IA puede ampliar investigacion si el currículo exige juzgar, verificar y crear.",
            limitations: "Argumento educativo, no ensayo causal.",
            url: "https://www.ibe.unesco.org/en/articles/critical-thinking-and-generative-artificial-intelligence"
          }
        ]
      }
    ],
    known: [
      "La IA genera respuestas plausibles que pueden contener errores.",
      "El diseño pedagogico importa mas que permitir o prohibir en abstracto.",
      "Privacidad, edad, sesgo y desigualdad requieren reglas explicitas."
    ],
    unknown: [
      "Efectos a largo plazo sobre escritura, memoria y pensamiento independiente.",
      "Que formas de tutoria producen transferencia real.",
      "Como evaluar justamente procesos realizados con distintos niveles de ayuda."
    ]
  },
  "deepfakes-y-confianza": {
    title: "Deepfakes y confianza publica",
    summary:
      "Los medios sinteticos permiten creatividad y accesibilidad, pero abaratan fraude, suplantacion y abuso sexual. El problema mayor puede ser que cualquier prueba autentica llegue a descartarse como falsa.",
    whyTrending:
      "Clonacion de voz, imagen generativa y videos falsos ya aparecen en estafas, pornografia no consentida, propaganda y contenido cotidiano de redes.",
    status: "Ficha editorial con riesgo operativo alto y deteccion imperfecta",
    support: [
      {
        title: "Los medios sinteticos tambien tienen usos creativos y legitimos",
        evidence: "Alta",
        consensus: "Alto",
        explanation:
          "Doblaje, restauracion, satira, privacidad, cine y accesibilidad pueden beneficiarse de sintetizar voz o imagen. No toda alteracion pretende engañar: consentimiento, contexto y etiquetado cambian la evaluacion.",
        strengths: ["Evita equiparar tecnologia y delito", "Centra el juicio en consentimiento e intencion"],
        limitations: ["El etiquetado puede perderse al republicar", "La misma herramienta sirve para usos dañinos"],
        counterarguments: ["La facilidad de abuso exige protecciones por defecto"],
        relatedConcepts: ["Consentimiento", "Procedencia", "Satira", "Sintesis"],
        resources: [
          {
            title: "Is This a Deepfake?",
            authors: "National Institute of Standards and Technology",
            year: 2025,
            journal: "NIST",
            studyType: "Revision sistematica",
            participants: "Guia sobre medios sinteticos y manipulados",
            summary: "Distingue medios sinteticos, reutilizados y editados, incluidos sus usos creativos y dañinos.",
            limitations: "Guia introductoria, no medicion de prevalencia.",
            url: "https://www.nist.gov/document/deepfake-desktop-version"
          }
        ]
      }
    ],
    opposition: [
      {
        title: "La deteccion automatica no ofrece una garantia estable",
        evidence: "Alta",
        consensus: "Alto",
        explanation:
          "Los detectores funcionan mejor en benchmarks que frente a compresion, edicion, ataques adversarios y modelos nuevos. Verificar procedencia, contexto, fuente original y canales alternativos es mas robusto que confiar en una app que diga real o falso.",
        strengths: ["Refleja una carrera tecnica cambiante", "Promueve verificacion en varias capas"],
        limitations: ["Los estandares de procedencia aun no son universales", "La verificacion exige tiempo y habilidades"],
        counterarguments: ["Los detectores siguen siendo una señal util dentro de un sistema más amplio"],
        relatedConcepts: ["Forensia digital", "Procedencia", "Dividendo del mentiroso", "Fraude"],
        resources: [
          {
            title: "GenAI: Deepfakes 2026",
            authors: "National Institute of Standards and Technology",
            year: 2026,
            journal: "NIST",
            studyType: "Observacional",
            participants: "Evaluacion adversaria de sistemas de deteccion",
            summary: "Documenta fuerte degradacion de detectores al pasar de evaluaciones academicas a despliegue operativo.",
            limitations: "Benchmark en desarrollo; el rendimiento cambia con modelos y ataques.",
            url: "https://ai-challenges.nist.gov/forensics"
          },
          {
            title: "Facing reality? Law enforcement and the challenge of deepfakes",
            authors: "Europol Innovation Lab",
            year: 2022,
            journal: "Europol",
            studyType: "Revision sistematica",
            participants: "Investigacion documental y consulta a especialistas",
            summary: "Describe riesgos de fraude de identidad, manipulacion de pruebas y pornografia no consentida.",
            limitations: "Analisis de amenazas, no estimacion causal de incidencia.",
            url: "https://www.europol.europa.eu/media-press/newsroom/news/europol-report-finds-deepfake-technology-could-become-staple-tool-for-organised-crime"
          }
        ]
      }
    ],
    known: [
      "Crear imitaciones convincentes es cada vez mas barato y accesible.",
      "Deteccion, etiquetado y procedencia deben combinarse.",
      "Consentimiento y daño importan mas que si una pieza es totalmente sintetica."
    ],
    unknown: [
      "Que estandares de procedencia alcanzaran adopcion universal.",
      "Como afectara la sospecha permanente a pruebas autenticas.",
      "Que regulacion protege sin bloquear satira y expresion legitima."
    ]
  },
  "estoicismo": {
    title: "Estoicismo moderno",
    summary:
      "El estoicismo ofrece una disciplina para distinguir lo controlable, revisar juicios y actuar conforme a valores. No enseña a no sentir ni constituye por si solo un tratamiento clinico.",
    whyTrending:
      "Podcasts, cuentas de disciplina y creadores de masculinidad lo presentan como antidoto contra ansiedad, rechazo, falta de foco y dependencia de la opinion ajena.",
    status: "Ficha editorial de filosofia practica; evidencia clinica indirecta",
    support: [
      {
        title: "Revisar juicios y centrar la accion puede mejorar la regulacion",
        evidence: "Moderada",
        consensus: "Medio",
        explanation:
          "La idea de que no controlamos el acontecimiento pero si parte de nuestra respuesta tiene paralelos con reestructuracion cognitiva, metacognicion y aceptacion. Puede reducir rumiacion inutil y orientar energia hacia acciones posibles.",
        strengths: ["Ofrece ejercicios concretos y una etica de responsabilidad", "Tolera incertidumbre y perdida"],
        limitations: ["El parecido con terapias modernas no prueba eficacia del estoicismo como paquete", "Puede aplicarse de forma rigida"],
        counterarguments: ["Los problemas materiales no desaparecen al cambiar el juicio"],
        relatedConcepts: ["Dicotomia del control", "Juicio", "Virtud", "Metacognicion"],
        resources: [
          {
            title: "Effectiveness of metacognitive interventions for mental disorders",
            authors: "Philipp et al.",
            year: 2019,
            journal: "Clinical Psychology & Psychotherapy",
            studyType: "Metaanalisis",
            participants: "Sintesis de intervenciones metacognitivas en adultos",
            summary: "Apoya mecanismos modernos relacionados con observar y revisar pensamientos.",
            limitations: "Evalua terapias metacognitivas, no estoicismo clasico.",
            url: "https://pubmed.ncbi.nlm.nih.gov/30456821/"
          }
        ]
      }
    ],
    opposition: [
      {
        title: "La version viral puede confundir serenidad con represion emocional",
        evidence: "Moderada",
        consensus: "Medio",
        explanation:
          "Los estoicos no defendian convertirse en piedra: analizaban emociones como respuestas ligadas a juicios. La caricatura de aguantar sin pedir ayuda puede empeorar aislamiento, ocultar abuso o convertir vulnerabilidad en fracaso moral.",
        strengths: ["Corrige la estetica de dureza emocional", "Distingue aceptacion de pasividad"],
        limitations: ["La mala divulgacion no invalida la filosofia original", "No toda disciplina emocional es represion"],
        counterarguments: ["Practicar pausa y perspectiva puede facilitar, no impedir, expresar emociones"],
        relatedConcepts: ["Represion", "Aceptacion", "Masculinidad", "Pasividad"],
        resources: [
          {
            title: "Meditation, mindfulness, and acceptance methods in psychotherapy",
            authors: "Goldberg et al.",
            year: 2023,
            journal: "Psychotherapy Research",
            studyType: "Revision sistematica",
            participants: "Estudios de metodos de aceptacion dentro de psicoterapia",
            summary: "Encuentra evidencia preliminar y subraya que contexto terapeutico y aplicacion importan.",
            limitations: "No estudia directamente practicas estoicas.",
            url: "https://pubmed.ncbi.nlm.nih.gov/37155740/"
          }
        ]
      }
    ],
    known: [
      "Estoicismo no significa ausencia de emociones.",
      "Comparte algunos mecanismos con enfoques psicologicos modernos.",
      "No sustituye atencion profesional ante sufrimiento clinico."
    ],
    unknown: [
      "Que ejercicios estoicos producen beneficios medibles por separado.",
      "Para que perfiles puede aumentar rigidez o autoculpa.",
      "Como separar la filosofia original de su version comercial en redes."
    ]
  }
};

const priorityTopicEnhancements: Record<string, Partial<Topic>> = {
  "ozempic-y-perdida-de-peso": {
    title: "Ozempic, Wegovy y fármacos GLP-1",
    status: "Ficha editorial con evidencia clínica alta para indicaciones concretas y debate abierto sobre acceso, continuidad y uso social",
    summary:
      "Ozempic y Wegovy contienen semaglutida, pero no tienen exactamente la misma indicación ni dosis. La evidencia disponible muestra pérdidas de peso clínicamente relevantes con semaglutida para obesidad y reducción de eventos cardiovasculares en determinados pacientes. No es una solución cosmética simple: requiere indicación, seguimiento, manejo de efectos adversos y una estrategia a largo plazo.",
    whyTrending:
      "Celebridades, transformaciones físicas, desabastecimiento y contenido de 'antes y después' han convertido una familia de tratamientos médicos en símbolo cultural. En redes se mezclan diabetes, obesidad, pérdida estética, disciplina, estigma y miedo a recuperar peso.",
    support: [
      {
        id: "glp1-perdida-peso",
        title: "La semaglutida puede producir una pérdida de peso relevante en personas con obesidad",
        summary: "STEP 1 encontró una reducción media aproximada del 15% junto con intervención de estilo de vida.",
        evidence: "Alta",
        consensus: "Alto",
        explanation:
          "En el ensayo STEP 1, adultos con obesidad o sobrepeso y comorbilidad, sin diabetes, recibieron semaglutida 2,4 mg o placebo junto con intervención de estilo de vida. La pérdida media fue del 14,9% frente al 2,4% con placebo a las 68 semanas. La evidencia no implica que toda persona obtenga el promedio ni que Ozempic deba usarse fuera de indicación para adelgazar.",
        strengths: ["Ensayo aleatorizado y controlado", "Muestra amplia", "Diferencia clínica grande frente a placebo"],
        limitations: ["Seguimiento limitado para una enfermedad crónica", "Financiación del fabricante", "Abandonos y efectos gastrointestinales"],
        counterarguments: ["La eficacia no resuelve coste, acceso, adherencia ni mantenimiento tras suspender"],
        resources: [
          {
            title: "Once-Weekly Semaglutide in Adults with Overweight or Obesity",
            authors: "Wilding et al.",
            year: 2021,
            journal: "New England Journal of Medicine",
            studyType: "Ensayo clinico",
            participants: "1.961 adultos con obesidad o sobrepeso y comorbilidad, sin diabetes",
            summary: "STEP 1 comparó semaglutida 2,4 mg con placebo durante 68 semanas.",
            limitations: "Financiado por Novo Nordisk; no responde por sí solo al mantenimiento durante años.",
            url: "https://www.nejm.org/doi/full/10.1056/NEJMoa2032183"
          }
        ],
        questions: ["¿La persona cumple una indicación médica estudiada?", "¿Cómo se medirá beneficio más allá de la báscula?"],
        relatedConcepts: ["Obesidad", "Semaglutida", "Saciedad", "Ensayo aleatorizado"]
      },
      {
        id: "glp1-beneficio-cardiovascular",
        title: "En pacientes de alto riesgo, el beneficio puede ir más allá del peso",
        summary: "SELECT encontró menos eventos cardiovasculares mayores en personas con enfermedad cardiovascular y sobrepeso u obesidad.",
        evidence: "Alta",
        consensus: "Alto",
        explanation:
          "SELECT incluyó a más de 17.600 personas con enfermedad cardiovascular establecida, sobrepeso u obesidad y sin diabetes. Los eventos cardiovasculares mayores ocurrieron en el 6,5% con semaglutida y en el 8,0% con placebo. Este resultado se aplica a esa población de alto riesgo, no a cualquier uso estético.",
        strengths: ["Gran ensayo internacional", "Mide eventos clínicos y no solo peso", "Seguimiento cercano a 40 meses"],
        limitations: ["Población con enfermedad cardiovascular previa", "Más interrupciones por efectos adversos", "Financiación del fabricante"],
        counterarguments: ["El beneficio absoluto depende del riesgo basal y no justifica prescripción indiscriminada"],
        resources: [
          {
            title: "Semaglutide and Cardiovascular Outcomes in Obesity without Diabetes",
            authors: "Lincoff et al.",
            year: 2023,
            journal: "New England Journal of Medicine",
            studyType: "Ensayo clinico",
            participants: "17.604 adultos con enfermedad cardiovascular y sobrepeso u obesidad",
            summary: "SELECT evaluó muerte cardiovascular, infarto o ictus con semaglutida frente a placebo.",
            limitations: "No representa prevención primaria ni personas de bajo riesgo.",
            url: "https://www.nejm.org/doi/full/10.1056/NEJMoa2307563"
          }
        ],
        questions: ["¿Cuál es el riesgo cardiovascular basal?", "¿Qué diferencia hay entre reducción relativa y absoluta?"],
        relatedConcepts: ["Riesgo absoluto", "Prevención secundaria", "SELECT", "Comorbilidad"]
      }
    ],
    opposition: [
      {
        id: "glp1-continuidad-peso",
        title: "Suspender el tratamiento suele ir seguido de recuperación de peso",
        summary: "La obesidad se comporta como una condición crónica y el efecto no suele mantenerse íntegro al retirar el fármaco.",
        evidence: "Moderada",
        consensus: "Alto",
        explanation:
          "La extensión de STEP 1 observó que, un año después de retirar semaglutida, los participantes habían recuperado aproximadamente dos tercios del peso perdido. Esto no significa que el fármaco 'cause' obesidad, sino que su efecto disminuye al cesar y que hace falta planificar continuidad, alternativas y expectativas.",
        strengths: ["Seguimiento tras retirada", "Mide peso y marcadores cardiometabólicos"],
        limitations: ["Extensión sin el mismo control experimental", "Solo una parte de participantes entró en el seguimiento"],
        counterarguments: ["La recuperación también ocurre tras otras intervenciones y no elimina el beneficio mientras se trata"],
        resources: [
          {
            title: "Weight regain and cardiometabolic effects after withdrawal of semaglutide",
            authors: "Wilding et al.",
            year: 2022,
            journal: "Diabetes, Obesity and Metabolism",
            studyType: "Longitudinal",
            participants: "Extensión sin tratamiento de participantes de STEP 1",
            summary: "Evalúa la trayectoria un año después de retirar semaglutida y la intervención de estilo de vida.",
            limitations: "Submuestra del ensayo original y fase de extensión no aleatorizada.",
            url: "https://pubmed.ncbi.nlm.nih.gov/35441470/"
          }
        ],
        questions: ["¿Existe un plan si se interrumpe por coste o efectos adversos?", "¿Se entiende como tratamiento crónico o curso temporal?"],
        relatedConcepts: ["Recuperación de peso", "Tratamiento crónico", "Adherencia", "Mantenimiento"]
      },
      {
        id: "glp1-seguridad-acceso",
        title: "Efectos adversos, contraindicaciones y acceso importan tanto como la eficacia",
        summary: "La prescripción necesita supervisión y no debe reducirse a una recomendación viral.",
        evidence: "Alta",
        consensus: "Alto",
        explanation:
          "Náuseas, vómitos, diarrea y estreñimiento son frecuentes; la información regulatoria incluye advertencias y situaciones en las que no debe usarse. En SELECT, la interrupción permanente por efectos adversos fue mayor con semaglutida. También existe debate ético sobre coste, desabastecimiento y desigualdad de acceso.",
        strengths: ["Información regulatoria y ensayos de seguridad", "Incorpora consecuencias clínicas y sociales"],
        limitations: ["La frecuencia depende de dosis, titulación y población", "El debate de acceso cambia entre sistemas sanitarios"],
        counterarguments: ["La titulación y el seguimiento reducen parte del riesgo y muchos efectos son manejables"],
        resources: [
          {
            title: "WEGOVY prescribing information",
            authors: "U.S. Food and Drug Administration",
            year: 2026,
            journal: "FDA",
            studyType: "Revision sistematica",
            participants: "Información regulatoria basada en el programa clínico de semaglutida",
            summary: "Indicaciones, dosificación, contraindicaciones, advertencias y efectos adversos de Wegovy.",
            limitations: "Documento regulatorio estadounidense; la autorización y disponibilidad varían por país.",
            url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2026/215256s033lbl.pdf"
          }
        ],
        questions: ["¿Qué riesgos y contraindicaciones tiene esta persona?", "¿Quién asume el coste y cómo afecta al acceso de otros pacientes?"],
        relatedConcepts: ["Farmacovigilancia", "Titulación", "Acceso", "Indicación"]
      }
    ],
    known: [
      "Semaglutida 2,4 mg ha producido pérdidas de peso medias relevantes en ensayos de obesidad.",
      "En una población con enfermedad cardiovascular previa redujo eventos cardiovasculares mayores.",
      "Los efectos gastrointestinales son frecuentes y algunas personas abandonan el tratamiento.",
      "Tras suspenderlo suele recuperarse una parte importante del peso."
    ],
    unknown: [
      "Cómo optimizar duración, retirada y mantenimiento para perfiles diferentes.",
      "Qué efectos tendrán décadas de tratamiento iniciadas a edades jóvenes.",
      "Cómo afectarán coste, disponibilidad y nuevas moléculas a la equidad sanitaria.",
      "Qué parte del beneficio cardiovascular depende del peso y qué parte de otros mecanismos."
    ],
    biases: ["Efecto halo", "Estigma de peso", "Sesgo de celebridad", "Supervivencia", "Conflicto de interés"]
  },
  "tdah": {
    status: "Ficha editorial basada en guías clínicas y revisiones sistemáticas; no sustituye diagnóstico",
    summary:
      "El TDAH es un trastorno del neurodesarrollo que exige síntomas persistentes, inicio temprano, deterioro y presencia en más de un contexto. Reconocerse en un vídeo puede motivar una consulta, pero ni un vídeo ni un cuestionario aislado establecen el diagnóstico.",
    support: [{
      id: "tdah-reconocimiento-tratamiento",
      title: "Mejor reconocimiento y tratamiento pueden reducir un deterioro real",
      summary: "El TDAH existe en infancia y adultez, y dispone de tratamientos con evidencia.",
      evidence: "Alta",
      consensus: "Alto",
      explanation:
        "Las guías recomiendan una evaluación clínica y psicosocial completa. Revisiones amplias encuentran evidencia fuerte de reducción sintomática a corto plazo con tratamientos farmacológicos, especialmente estimulantes, dentro de un plan individualizado.",
      strengths: ["Guías multidisciplinares", "Amplia literatura clínica", "Reconoce deterioro educativo, laboral y relacional"],
      limitations: ["La respuesta individual varía", "La reducción de síntomas no resume todos los resultados vitales"],
      counterarguments: ["Diagnosticar mejor no significa medicalizar cualquier distracción"],
      resources: [{
        title: "Attention deficit hyperactivity disorder: diagnosis and management",
        authors: "National Institute for Health and Care Excellence",
        year: 2025,
        journal: "NICE NG87",
        studyType: "Revision sistematica",
        participants: "Niños, jóvenes y adultos con sospecha o diagnóstico de TDAH",
        summary: "Guía sobre reconocimiento, diagnóstico, apoyo, tratamiento y revisión.",
        limitations: "Debe adaptarse al sistema sanitario y a las circunstancias individuales.",
        url: "https://www.nice.org.uk/guidance/ng87/chapter/recommendations"
      }],
      questions: ["¿Los síntomas aparecían en la infancia y en varios contextos?", "¿Qué deterioro funcional concreto producen?"],
      relatedConcepts: ["Diagnóstico diferencial", "Funciones ejecutivas", "Deterioro funcional", "Tratamiento compartido"]
    }],
    opposition: [{
      id: "tdah-autodiagnostico-redes",
      title: "El contenido viral puede convertir rasgos comunes en autodiagnóstico",
      summary: "La identificación emocional no distingue TDAH de sueño, ansiedad, depresión, estrés u otras causas.",
      evidence: "Moderada",
      consensus: "Alto",
      explanation:
        "Análisis de contenido encuentran información engañosa en vídeos populares sobre TDAH. NICE indica que el diagnóstico no debe basarse solo en escalas u observación y requiere historia del desarrollo, distintos contextos y evaluación de condiciones coexistentes.",
      strengths: ["Reduce falsos positivos", "Protege el diagnóstico diferencial"],
      limitations: ["La mala información no invalida experiencias ni barreras reales de acceso"],
      counterarguments: ["Las redes también ayudan a reconocer síntomas antes ignorados"],
      resources: [{
        title: "TikTok and Attention-Deficit/Hyperactivity Disorder: A Cross-Sectional Study",
        authors: "Yeung et al.",
        year: 2022,
        journal: "Canadian Journal of Psychiatry",
        studyType: "Observacional",
        participants: "Vídeos populares de TikTok sobre TDAH",
        summary: "Evalúa calidad y precisión de contenido popular sobre TDAH.",
        limitations: "Fotografía temporal de una plataforma; no mide diagnósticos clínicos posteriores.",
        url: "https://pubmed.ncbi.nlm.nih.gov/35196157/"
      }],
      questions: ["¿Qué explicaciones alternativas se han evaluado?", "¿La fuente describe criterios diagnósticos o una lista genérica de rasgos?"],
      relatedConcepts: ["Autodiagnóstico", "Misinformación", "Sueño", "Comorbilidad"]
    }],
    known: [
      "El diagnóstico requiere evaluación especializada, historia y deterioro en varios contextos.",
      "Una escala aislada no basta.",
      "Existen tratamientos eficaces, con beneficios y riesgos que deben revisarse."
    ],
    unknown: [
      "Cómo mejorar acceso sin reducir calidad diagnóstica.",
      "Qué efectos tiene el contenido viral en solicitudes, expectativas y estigma.",
      "Qué combinación de apoyos funciona mejor para cada perfil."
    ],
    biases: ["Confirmación", "Etiquetado", "Disponibilidad", "Base rate neglect"]
  },
  "ansiedad": {
    status: "Ficha editorial basada en guías internacionales; distingue ansiedad normal y trastorno",
    summary:
      "Sentir ansiedad es normal. Un trastorno implica miedo o preocupación intensos, persistentes, difíciles de controlar y con deterioro. La evidencia respalda intervenciones psicológicas, especialmente enfoques cognitivo-conductuales y exposición, y en algunos casos medicación supervisada.",
    support: [{
      id: "ansiedad-reconocimiento-tratamiento",
      title: "Nombrar y tratar la ansiedad clínica puede mejorar mucho la vida",
      summary: "Hay tratamientos eficaces y una gran brecha mundial de atención.",
      evidence: "Alta",
      consensus: "Alto",
      explanation:
        "La OMS distingue preocupación cotidiana de trastornos persistentes con sufrimiento y deterioro. Las intervenciones con más evidencia incluyen principios cognitivo-conductuales y exposición; algunos antidepresivos también pueden ayudar en adultos.",
      strengths: ["Consenso clínico internacional", "Tratamientos evaluados", "Reduce estigma y evitación de ayuda"],
      limitations: ["No todas las terapias funcionan igual para todas las personas", "Acceso desigual a profesionales"],
      counterarguments: ["Normalizar no debe convertir cada emoción difícil en enfermedad"],
      resources: [{
        title: "Trastornos de ansiedad",
        authors: "Organización Mundial de la Salud",
        year: 2025,
        journal: "OMS",
        studyType: "Revision sistematica",
        participants: "Síntesis mundial sobre trastornos de ansiedad",
        summary: "Diferencia síntomas, tipos, factores y tratamientos con evidencia.",
        limitations: "Síntesis general; no sustituye guías específicas por diagnóstico.",
        url: "https://www.who.int/es/news-room/fact-sheets/detail/anxiety-disorders"
      }],
      questions: ["¿La ansiedad es proporcional, persistente y limitante?", "¿Qué conductas de evitación la mantienen?"],
      relatedConcepts: ["Exposición", "Evitación", "TCC", "Deterioro funcional"]
    }],
    opposition: [{
      id: "ansiedad-patologizacion",
      title: "El lenguaje terapéutico puede patologizar malestar y vender soluciones rápidas",
      summary: "No todo nerviosismo es un trastorno ni toda incomodidad debe eliminarse.",
      evidence: "Moderada",
      consensus: "Medio",
      explanation:
        "En redes se mezclan educación útil, listas de síntomas inespecíficos y marketing. Evitar sistemáticamente cualquier situación que active ansiedad puede reforzarla; el objetivo clínico no suele ser no sentir, sino recuperar libertad y funcionamiento.",
      strengths: ["Protege de autodiagnóstico y medicalización", "Distingue alivio inmediato y mejora duradera"],
      limitations: ["Puede minimizar sufrimiento real", "La detección temprana sigue siendo valiosa"],
      counterarguments: ["Un lenguaje accesible puede facilitar que personas sin atención reconozcan un problema"],
      resources: [{
        title: "Anxiety evidence review",
        authors: "World Health Organization mhGAP",
        year: 2024,
        journal: "WHO",
        studyType: "Revision sistematica",
        participants: "Ensayos y revisiones de intervenciones para ansiedad",
        summary: "Revisión de evidencia para intervenciones psicológicas y farmacológicas.",
        limitations: "Agrupa trastornos, contextos e intervenciones heterogéneos.",
        url: "https://cdn.who.int/media/docs/default-source/mental-health/mhgap/mhgap-anxiety-evidence-review-report%2829012024%29_eb.pdf"
      }],
      questions: ["¿El consejo reduce evitación o solo promete alivio?", "¿Quién se beneficia de presentar el malestar como diagnóstico?"],
      relatedConcepts: ["Patologización", "Evitación experiencial", "Marketing de bienestar", "Incertidumbre"]
    }],
    known: [
      "Los trastornos de ansiedad implican persistencia, intensidad y deterioro.",
      "La terapia cognitivo-conductual y la exposición cuentan con evidencia amplia.",
      "Las benzodiazepinas presentan problemas de dependencia y no suelen recomendarse como solución prolongada."
    ],
    unknown: [
      "Cómo cerrar la gran brecha de acceso a tratamientos eficaces.",
      "Qué formato funciona mejor para cada persona y contexto.",
      "Cómo influye el contenido de redes en autodiagnóstico y evitación."
    ],
    biases: ["Razonamiento emocional", "Disponibilidad", "Catastrofismo", "Etiquetado"]
  },
  "pantallas-y-ninos": {
    status: "Ficha editorial con asociaciones consistentes en sueño y evidencia causal más limitada en otros resultados",
    summary:
      "No existe una única variable llamada 'pantalla'. Edad, contenido, horario, interacción, acompañamiento y actividades desplazadas cambian el resultado. La relación más consistente aparece con sueño; para atención y desarrollo abundan estudios observacionales que exigen prudencia causal.",
    support: [{
      id: "pantallas-riesgos-contextuales",
      title: "Uso excesivo o nocturno puede desplazar sueño, movimiento e interacción",
      summary: "El problema puede ser tanto el contenido como aquello que deja de ocurrir.",
      evidence: "Moderada",
      consensus: "Medio",
      explanation:
        "Revisiones encuentran asociaciones entre mayor exposición y peor sueño en niños pequeños, y asociaciones frecuentes con problemas de atención. No puede inferirse causalidad directamente en muchos estudios: las familias, el comportamiento previo y el contexto también influyen.",
      strengths: ["Resultados repetidos en distintas muestras", "Mecanismos plausibles de desplazamiento y horario"],
      limitations: ["Medición de pantalla a menudo autoinformada", "Contenido y contexto se agrupan en una sola cifra"],
      counterarguments: ["Reducir tiempo sin mejorar sueño, juego o convivencia puede no resolver el problema"],
      resources: [{
        title: "Associations of screen time, sedentary time and physical activity with sleep in under 5s",
        authors: "Janssen et al.",
        year: 2020,
        journal: "Sleep Medicine Reviews",
        studyType: "Metaanalisis",
        participants: "31 estudios en menores de cinco años",
        summary: "Evalúa asociaciones entre pantallas, movimiento y resultados de sueño.",
        limitations: "Predominio de estudios observacionales y heterogeneidad de medidas.",
        url: "https://pubmed.ncbi.nlm.nih.gov/31778942/"
      }],
      questions: ["¿Qué actividad está desplazando la pantalla?", "¿Ocurre cerca de la hora de dormir?"],
      relatedConcepts: ["Sueño", "Desplazamiento", "Atención", "Rutinas"]
    }],
    opposition: [{
      id: "pantallas-no-son-uniformes",
      title: "Contar minutos sin mirar contenido y acompañamiento simplifica demasiado",
      summary: "Videollamar, crear, estudiar y consumir vídeos infinitos no son la misma exposición.",
      evidence: "Moderada",
      consensus: "Medio",
      explanation:
        "La orientación pediátrica reciente enfatiza calidad, niño, contenido, calma, desplazamiento y comunicación, no solo un cronómetro. El acompañamiento adulto y el diseño del contenido modifican el valor educativo y los riesgos.",
      strengths: ["Mejora la precisión de recomendaciones", "Evita culpabilizar a familias sin considerar contexto"],
      limitations: ["La calidad es difícil de medir", "Un buen contenido también puede desplazar sueño o movimiento"],
      counterarguments: ["Los límites temporales siguen siendo una regla práctica útil para algunas familias"],
      resources: [{
        title: "Understanding the New AAP Digital Media Guidelines",
        authors: "American Academy of Pediatrics",
        year: 2024,
        journal: "AAP",
        studyType: "Revision sistematica",
        participants: "Orientación para familias, infancia y adolescencia",
        summary: "Propone evaluar las 5 C del uso de medios más allá del tiempo total.",
        limitations: "Orientación clínica y familiar, no un ensayo causal.",
        url: "https://www.aap.org/en/patient-care/media-and-children/center-of-excellence-on-social-media-and-youth-mental-health/understanding-the-new-AAP-digital-media-guidelines/"
      }],
      questions: ["¿Qué hace el niño en la pantalla y con quién?", "¿La regla familiar es sostenible y coherente con el ejemplo adulto?"],
      relatedConcepts: ["Mediación parental", "Calidad de contenido", "Alfabetización digital", "Contexto"]
    }],
    known: [
      "El uso nocturno y el desplazamiento de sueño son preocupaciones consistentes.",
      "Contenido, edad y acompañamiento importan.",
      "Muchas asociaciones con atención no prueban causalidad por sí solas."
    ],
    unknown: [
      "Efectos a largo plazo de plataformas y formatos que cambian rápidamente.",
      "Qué combinaciones de contenido y acompañamiento aportan beneficios duraderos.",
      "Qué límites funcionan sin aumentar conflicto o desigualdad familiar."
    ],
    biases: ["Pánico moral", "Nostalgia", "Causalidad ilusoria", "Culpa parental"]
  },
  "feminismo-contemporaneo": {
    status: "Ficha editorial basada en datos internacionales; diferencia hechos, valores y politicas",
    summary:
      "El feminismo contemporaneo no es una doctrina unica. Reune corrientes preocupadas por desigualdades vinculadas al sexo y al genero, pero con desacuerdos sobre causas, prioridades y soluciones. Evaluarlo exige separar datos medibles, principios normativos y eficacia de politicas concretas.",
    whyTrending:
      "Derechos reproductivos, violencia sexual, cuidados, trabajo, identidad y reaccion antifeminista convierten cada debate en una disputa sobre poder, libertad y pertenencia.",
    support: [
      {
        id: "feminismo-desigualdades-medibles",
        title: "Persisten desigualdades de genero medibles que justifican accion publica",
        summary: "Violencia, cuidados no remunerados y representacion muestran brechas relevantes, aunque varian entre paises.",
        evidence: "Alta",
        consensus: "Alto",
        explanation:
          "Los datos internacionales muestran que la igualdad legal y material no se ha alcanzado de forma uniforme. Reconocer esas brechas no determina por si solo que politica es mejor, pero impide reducir el debate a percepciones individuales.",
        strengths: ["Se apoya en indicadores comparables", "Distingue desigualdad observada de explicacion ideologica"],
        limitations: ["Los promedios globales ocultan diferencias nacionales", "Un indicador descriptivo no prueba una causa unica"],
        counterarguments: ["Algunas brechas se han reducido o cambian segun el ambito", "Tambien deben estudiarse desventajas especificas de hombres y ninos"],
        resources: [
          {
            title: "Progress on the Sustainable Development Goals: The Gender Snapshot 2024",
            authors: "UN Women y UN DESA",
            year: 2024,
            journal: "UN Women",
            studyType: "Revision sistematica",
            participants: "Indicadores internacionales de los 17 Objetivos de Desarrollo Sostenible",
            summary: "Sintetiza datos sobre pobreza, cuidados, representacion, violencia y derechos.",
            limitations: "La cobertura y calidad de los indicadores varia entre paises.",
            url: "https://knowledge.unwomen.org/en/digital-library/publications/2024/09/progress-on-the-sustainable-development-goals-the-gender-snapshot-2024"
          },
          {
            title: "Violence against women",
            authors: "World Health Organization",
            year: 2024,
            journal: "WHO",
            studyType: "Revision sistematica",
            participants: "Estimaciones globales y regionales de encuestas poblacionales",
            summary: "Resume prevalencia y consecuencias sanitarias de violencia de pareja y sexual.",
            limitations: "La infradeclaracion y las diferencias de medicion afectan las estimaciones.",
            url: "https://www.who.int/news-room/fact-sheets/detail/violence-against-women"
          }
        ],
        questions: ["Que desigualdad concreta se esta discutiendo?", "El dato es global, nacional o de un subgrupo?"],
        relatedConcepts: ["Igualdad sustantiva", "Violencia de genero", "Cuidados", "Representacion"]
      },
      {
        id: "feminismo-interseccionalidad",
        title: "La interseccionalidad puede mejorar diagnosticos que tratan a todas las mujeres como un grupo uniforme",
        summary: "Sexo, clase, origen y discapacidad pueden combinarse de formas que un promedio no capta.",
        evidence: "Moderada",
        consensus: "Medio",
        explanation:
          "El enfoque interseccional pregunta como se combinan posiciones sociales y sistemas institucionales. Puede revelar necesidades ocultas por categorias amplias, aunque trasladar una teoria compleja a variables y politicas evaluables sigue siendo dificil.",
        strengths: ["Evita universalizar la experiencia de los grupos mas visibles", "Ayuda a detectar efectos distributivos"],
        limitations: ["No existe una unica forma de medirla", "Demasiadas categorias pueden dificultar priorizacion"],
        counterarguments: ["Politicas universales bien disenadas pueden ser mas simples y generar coaliciones amplias"],
        resources: [{
          title: "Intersectionality in quantitative research: A systematic review",
          authors: "Bauer y colaboradores",
          year: 2021,
          journal: "SSM - Population Health",
          studyType: "Revision sistematica",
          participants: "Estudios cuantitativos que aplican marcos interseccionales",
          summary: "Examina como se traduce la interseccionalidad a metodos empiricos.",
          limitations: "Encuentra una aplicacion metodologica desigual.",
          url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8095182/"
        }],
        questions: ["Que grupo queda invisible en el promedio?", "La categoria explica el mecanismo o solo lo etiqueta?"],
        relatedConcepts: ["Interseccionalidad", "Clase social", "Discriminacion", "Politica publica"]
      }
    ],
    opposition: [
      {
        id: "feminismo-no-es-bloque-unico",
        title: "Criticar una corriente o politica feminista no refuta todo el feminismo",
        summary: "Las disputas internas deben evaluarse por propuesta, contexto y resultados.",
        evidence: "Moderada",
        consensus: "Alto",
        explanation:
          "Existe debate sobre cuotas, lenguaje, justicia penal, trabajo sexual, identidad y familia. Agrupar posiciones incompatibles bajo una sola etiqueta produce hombres de paja. La critica solida identifica la afirmacion concreta y pregunta que evidencia la apoyaria.",
        strengths: ["Reduce polarizacion conceptual", "Permite evaluar consecuencias no previstas"],
        limitations: ["Las corrientes comparten influencias y efectos politicos", "La fragmentacion puede ocultar ideas dominantes"],
        counterarguments: ["Tambien es legitimo analizar patrones comunes entre movimientos y discursos"],
        resources: [{
          title: "Promoting Gender Equality: A Systematic Review of Interventions",
          authors: "Guthridge y colaboradores",
          year: 2022,
          journal: "Social Justice Research",
          studyType: "Revision sistematica",
          participants: "78 estudios sobre intervenciones frente a desigualdad y discriminacion",
          summary: "Muestra la diversidad de intervenciones y la necesidad de evaluar cada contexto.",
          limitations: "Gran heterogeneidad de disenos y resultados.",
          url: "https://link.springer.com/article/10.1007/s11211-022-00398-z"
        }],
        questions: ["Que corriente o politica se esta criticando?", "La objecion cuestiona el objetivo, el diagnostico o el medio?"],
        relatedConcepts: ["Pluralismo", "Hombre de paja", "Evaluacion de politicas", "Coaliciones"]
      },
      {
        id: "feminismo-politicas-efectos",
        title: "Una causa justa no garantiza que cada politica propuesta sea eficaz",
        summary: "Los objetivos normativos necesitan evaluacion empirica y atencion a efectos distributivos.",
        evidence: "Moderada",
        consensus: "Alto",
        explanation:
          "De datos reales sobre desigualdad no se deriva automaticamente una intervencion. Cuotas, permisos, educacion o respuestas penales actuan mediante mecanismos distintos y pueden tener resultados dependientes del contexto.",
        strengths: ["Exige rendicion de cuentas", "Separa intencion de resultado"],
        limitations: ["Los cambios culturales son dificiles de atribuir", "Ausencia de evidencia no equivale a ineficacia"],
        counterarguments: ["Esperar evidencia perfecta puede conservar una situacion injusta", "Los derechos no siempre dependen de un calculo coste-beneficio"],
        resources: [{
          title: "Women at Work in G20 countries",
          authors: "International Labour Organization",
          year: 2024,
          journal: "ILO",
          studyType: "Observacional",
          participants: "Indicadores laborales de las economias del G20",
          summary: "Compara participacion, empleo, salarios y cuidados.",
          limitations: "Los datos agregados no identifican el efecto causal de cada politica.",
          url: "https://www.ilo.org/sites/default/files/2024-08/G20_Women%40Work_report_2024.pdf"
        }],
        questions: ["Que resultado medible deberia cambiar?", "Quien obtiene beneficios y quien asume los costes?"],
        relatedConcepts: ["Eficacia", "Evaluacion causal", "Derechos", "Efectos no previstos"]
      }
    ],
    known: [
      "El feminismo contemporaneo contiene corrientes y desacuerdos sustantivos.",
      "Persisten desigualdades de genero medibles, con forma distinta segun pais y ambito.",
      "Los datos descriptivos no determinan automaticamente una causa ni una politica."
    ],
    unknown: [
      "Que combinaciones de politicas producen cambios duraderos en cada contexto.",
      "Como medir desventajas interseccionadas sin perder claridad.",
      "Que estrategias reducen desigualdad y polarizacion a la vez."
    ],
    biases: ["Hombre de paja", "Confirmacion", "Homogeneidad del exogrupo", "Razonamiento motivado"]
  },
  "ghosting": {
    status: "Ficha editorial basada en estudios relacionales; evidencia todavia emergente",
    summary:
      "El ghosting es el fin unilateral de una relacion significativa mediante el cese de comunicacion sin explicacion. Puede generar rechazo, incertidumbre y rumiacion, pero su gravedad depende del vinculo, las expectativas y la seguridad. Dejar sin respuesta un contacto minimo no equivale a desaparecer de una relacion consolidada.",
    whyTrending:
      "Las apps permiten iniciar muchos vinculos con pocas normas compartidas. En redes, el termino se usa tanto para una conversacion que se enfria como para una ruptura abrupta tras meses.",
    support: [
      {
        id: "ghosting-ambiguedad-rechazo",
        title: "La falta de explicacion puede intensificar la incertidumbre y dificultar el cierre",
        summary: "El rechazo duele; el ghosting anade ambiguedad sobre que ocurrio y si el vinculo termino.",
        evidence: "Moderada",
        consensus: "Medio",
        explanation:
          "Estudios sobre experiencias de ghosting lo relacionan con ostracismo, ansiedad y emociones negativas. La ausencia de una senal final puede mantener busquedas de explicacion. Gran parte de la evidencia es correlacional, retrospectiva y concentrada en adultos jovenes.",
        strengths: ["Encaja con investigacion sobre rechazo y pertenencia", "Distingue ruptura de incertidumbre anadida"],
        limitations: ["Autoinformes y muestras de conveniencia", "La ansiedad previa puede influir en la experiencia"],
        counterarguments: ["Una explicacion cruel tambien puede hacer dano", "No toda persona necesita una conversacion extensa"],
        resources: [
          {
            title: "Ghosting and orbiting: An analysis of victims' experiences",
            authors: "Pancani, Mazzoni, Aureli y Riva",
            year: 2021,
            journal: "Journal of Social and Personal Relationships",
            studyType: "Observacional",
            participants: "Personas con experiencias de ruptura directa, ghosting u orbiting",
            summary: "Compara reacciones y analiza el ghosting como forma de ostracismo.",
            limitations: "La experiencia se recoge retrospectivamente y no prueba causalidad.",
            url: "https://journals.sagepub.com/doi/abs/10.1177/02654075211000417"
          },
          {
            title: "Emotional experiences of ghosting",
            authors: "Freedman y colaboradores",
            year: 2022,
            journal: "Journal of Social and Personal Relationships",
            studyType: "Observacional",
            participants: "80 personas que habian ghosteado y habian sido ghosteadas",
            summary: "Examina emociones de ambas partes y muestra experiencias heterogeneas.",
            limitations: "Muestra pequena y seleccion de personas con ambos roles.",
            url: "https://pubmed.ncbi.nlm.nih.gov/35621208/"
          }
        ],
        questions: ["Que expectativa de continuidad existia?", "La incertidumbre procede del silencio o tambien de senales previas?"],
        relatedConcepts: ["Ostracismo", "Perdida ambigua", "Rechazo", "Cierre"]
      },
      {
        id: "ghosting-comunicacion-directa",
        title: "En vinculos con inversion mutua, una despedida breve suele ser mas responsable",
        summary: "La responsabilidad aumenta con intimidad, duracion, compromisos y dependencia.",
        evidence: "Moderada",
        consensus: "Medio",
        explanation:
          "No existe una regla cientifica que obligue a continuar una conversacion, pero las normas de reciprocidad cambian cuando hubo confianza o planes. Un mensaje claro puede reducir ambiguedad sin abrir una negociacion interminable.",
        strengths: ["Adapta la obligacion al nivel de vinculo", "Propone una alternativa concreta y de bajo coste"],
        limitations: ["No garantiza que la otra persona acepte el limite", "Las normas varian entre culturas"],
        counterarguments: ["Tras expresar claramente el final, dejar de responder ya no deberia llamarse ghosting"],
        resources: [{
          title: "An empirical, accessible definition of ghosting as a relationship dissolution method",
          authors: "Kay y Courtice",
          year: 2022,
          journal: "Personal Relationships",
          studyType: "Observacional",
          participants: "Investigacion cualitativa y validacion conceptual",
          summary: "Delimita el concepto frente a otros finales o pausas de comunicacion.",
          limitations: "Definir el fenomeno no establece por si mismo su dano.",
          url: "https://onlinelibrary.wiley.com/doi/10.1111/pere.12423"
        }],
        questions: ["Hubo una despedida clara antes del silencio?", "Que mensaje minimo cerraria el vinculo?"],
        relatedConcepts: ["Responsabilidad afectiva", "Limites", "Reciprocidad", "Ruptura"]
      }
    ],
    opposition: [
      {
        id: "ghosting-contexto-importa",
        title: "No responder no siempre es una falta grave ni todos los casos son ghosting",
        summary: "El significado cambia con las interacciones, acuerdos y existencia real de una relacion.",
        evidence: "Moderada",
        consensus: "Medio",
        explanation:
          "Existe desacuerdo sobre cuando empieza el ghosting. Una charla breve en una app sin encuentro ni expectativa no tiene las mismas obligaciones que una amistad o relacion estable. Inflar el termino puede convertir cualquier perdida de interes en dano moral.",
        strengths: ["Evita categorias demasiado amplias", "Relaciona responsabilidad con inversion y expectativas"],
        limitations: ["Incluso un vinculo breve puede vivirse intensamente", "Las expectativas a menudo no se hablan"],
        counterarguments: ["Un mensaje cortes puede seguir siendo preferible aunque la obligacion sea pequena"],
        resources: [{
          title: "What is (not) ghosting? A theoretical analysis via three key pillars",
          authors: "Autores de Computers in Human Behavior",
          year: 2025,
          journal: "Computers in Human Behavior",
          studyType: "Opinion",
          participants: "Sintesis sobre vinculos, tecnologia e intencion de finalizar",
          summary: "Propone reservar el termino para el cese sin explicacion de una relacion significativa.",
          limitations: "Marco reciente que necesita mas validacion empirica.",
          url: "https://www.sciencedirect.com/science/article/pii/S0747563225000846"
        }],
        questions: ["Existia una relacion significativa o solo posibilidad de relacion?", "Se habia pactado volver a hablar?"],
        relatedConcepts: ["Definicion", "Expectativas", "Inversion relacional", "Normas digitales"]
      },
      {
        id: "ghosting-seguridad",
        title: "Cortar contacto puede ser razonable cuando comunicar aumenta el riesgo",
        summary: "La cortesia no obliga a exponerse a acoso, manipulacion, amenazas o insistencia.",
        evidence: "Baja",
        consensus: "Alto",
        explanation:
          "En contextos de miedo, control, abuso o limites ignorados, la seguridad tiene prioridad. Bloquear y cesar contacto puede ser una medida protectora. La excepcion no justifica todos los silencios, pero evita moralizar una salida necesaria.",
        strengths: ["Introduce seguridad y asimetrias de poder", "Evita convertir responsabilidad en disponibilidad obligatoria"],
        limitations: ["La evidencia especifica es principalmente cualitativa", "Desde fuera puede ser dificil conocer el riesgo"],
        counterarguments: ["Cuando es seguro, un mensaje unico y no negociable puede cerrar mejor"],
        resources: [{
          title: "A multi-study examination of attachment and implicit theories of relationships in ghosting experiences",
          authors: "Powell, Freedman, Williams, Le y Green",
          year: 2021,
          journal: "Journal of Social and Personal Relationships",
          studyType: "Observacional",
          participants: "Muestras de adultos con experiencias de ghosting",
          summary: "Examina diferencias individuales y motivos sin reducirlos a una causa unica.",
          limitations: "Las asociaciones no permiten diagnosticar a individuos.",
          url: "https://journals.sagepub.com/doi/abs/10.1177/02654075211009308"
        }],
        questions: ["Habia miedo, presion o limites ignorados?", "Es posible cerrar de forma segura o hace falta bloquear?"],
        relatedConcepts: ["Seguridad", "Acoso", "Consentimiento", "Limites"]
      }
    ],
    known: [
      "El ghosting combina final unilateral, ausencia de explicacion y cese de comunicacion.",
      "Puede producir rechazo e incertidumbre, pero los efectos varian.",
      "Duracion, intimidad, expectativas y seguridad cambian la responsabilidad."
    ],
    unknown: [
      "Que efectos persisten a largo plazo frente a otras rupturas.",
      "Que mensaje minimo reduce dano sin fomentar negociacion o riesgo.",
      "Como varian normas y efectos por edad, cultura y tipo de relacion."
    ],
    biases: ["Lectura de mente", "Personalizacion", "Error fundamental de atribucion", "Sesgo retrospectivo"]
  },
  "apego-y-relaciones": {
    status: "Ficha editorial con base teorica amplia y evidencia relacional moderada",
    summary:
      "La evidencia disponible sugiere que los patrones de apego se relacionan con regulacion emocional, confianza e intimidad. No son identidades fijas: cambian entre relaciones, contextos y etapas de vida.",
    support: [
      {
        id: "apego-marco-relacional",
        title: "El apego ofrece un marco util para comprender patrones relacionales",
        summary: "Ayuda a formular hipotesis sobre seguridad, proximidad y respuesta al conflicto.",
        evidence: "Moderada",
        consensus: "Medio",
        explanation:
          "Algunos estudios encuentran asociaciones consistentes entre seguridad de apego, satisfaccion relacional, apoyo y regulacion emocional. Una limitacion importante es que gran parte de la investigacion usa autoinformes y no puede inferirse causalidad directamente.",
        strengths: ["Integra desarrollo, emociones y relaciones", "Genera preguntas utiles para terapia y autocuidado"],
        limitations: ["Muchas medidas son autoinformadas", "Los efectos medios no describen a cada persona"],
        counterarguments: ["Comunicacion, estres y compatibilidad pueden explicar parte de las mismas diferencias"],
        resources: [
          {
            title: "Adult attachment and relationship functioning",
            authors: "Mikulincer, Shaver y otros autores",
            year: 2023,
            journal: "Google Scholar",
            studyType: "Revision sistematica",
            participants: "Revisiones y estudios de parejas adultas",
            summary: "Busqueda academica sobre apego adulto, satisfaccion y regulacion en relaciones.",
            limitations: "La busqueda incluye metodos y poblaciones heterogeneas.",
            url: "https://scholar.google.com/scholar?q=adult+attachment+relationship+satisfaction+systematic+review"
          }
        ],
        questions: ["El patron aparece en todas tus relaciones o solo en algunas?", "Que conducta observable apoyaria esta interpretacion?"],
        relatedConcepts: ["Apego seguro", "Regulacion emocional", "Intimidad", "Confianza"]
      }
    ],
    opposition: [
      {
        id: "apego-etiquetas-rigidas",
        title: "Las etiquetas de apego pueden simplificar y fijar demasiado a las personas",
        summary: "Una herramienta descriptiva puede convertirse en diagnostico informal.",
        evidence: "Moderada",
        consensus: "Medio",
        explanation:
          "Existe debate sobre convertir dimensiones continuas y sensibles al contexto en cuatro tipos cerrados. En redes, las etiquetas pueden usarse para explicar cualquier conflicto, justificar conductas o diagnosticar a una expareja sin evaluacion.",
        strengths: ["Evita esencialismo psicologico", "Recuerda el peso del contexto y del aprendizaje"],
        limitations: ["La mala divulgacion no invalida toda la teoria", "Los patrones estables si aparecen en parte de la literatura"],
        counterarguments: ["Las etiquetas pueden ser un punto de partida si se usan como hipotesis revisables"],
        resources: [
          {
            title: "Adult attachment measurement and stability",
            authors: "Investigacion internacional sobre apego adulto",
            year: 2024,
            journal: "PubMed",
            studyType: "Revision sistematica",
            participants: "Estudios longitudinales y psicometricos",
            summary: "Busqueda sobre estabilidad, cambio y medicion de estilos de apego.",
            limitations: "No todos los resultados son comparables entre instrumentos.",
            url: "https://pubmed.ncbi.nlm.nih.gov/?term=adult+attachment+stability+measurement+review"
          }
        ],
        questions: ["La etiqueta explica o solo renombra la conducta?", "Que factores actuales podrian producir el mismo patron?"],
        relatedConcepts: ["Validez", "Etiquetado", "Cambio", "Diagnostico informal"]
      }
    ],
    known: [
      "La seguridad de apego se asocia con mejor funcionamiento relacional en promedio.",
      "Los patrones muestran continuidad, pero tambien pueden cambiar.",
      "Una etiqueta de redes no sustituye una evaluacion contextual."
    ],
    unknown: [
      "Que intervenciones cambian patrones de forma mas fiable y para quien.",
      "Cuanto depende cada resultado de cultura, pareja y momento vital.",
      "Como separar efecto del apego de personalidad, trauma y estres actual."
    ],
    biases: ["Etiquetado", "Confirmacion", "Error fundamental de atribucion", "Esencialismo"]
  },
  "dieta-carnivora": {
    status: "Ficha editorial con evidencia directa muy limitada y riesgos plausibles a largo plazo",
    summary:
      "Los testimonios no permiten concluir que una dieta exclusivamente animal trate enfermedades. Puede producir perdida de peso a corto plazo, pero faltan ensayos duraderos y existen preguntas sobre LDL, fibra, microbiota y micronutrientes.",
    support: [
      {
        id: "carnivora-saciedad-eliminacion",
        title: "Puede simplificar decisiones y aumentar saciedad a corto plazo",
        summary: "La restriccion extrema puede reducir variedad, calorias y alimentos desencadenantes.",
        evidence: "Baja",
        consensus: "Bajo",
        explanation:
          "Algunas personas informan menos hambre, perdida de peso o mejoria digestiva. Es plausible que proteina, saciedad y eliminacion de ultraprocesados contribuyan. No puede inferirse que excluir plantas sea el mecanismo necesario.",
        strengths: ["Reconoce experiencias reales", "Propone mecanismos comprobables como saciedad y menor variedad"],
        limitations: ["Predominan testimonios y encuestas autoseleccionadas", "No separa eliminacion de ultraprocesados de eliminacion de plantas"],
        counterarguments: ["Patrones menos restrictivos pueden lograr beneficios similares con mas evidencia"],
        resources: [
          {
            title: "Behavioral characteristics and self-reported health status among carnivore diet consumers",
            authors: "Lennerz y colaboradores",
            year: 2021,
            journal: "Current Developments in Nutrition",
            studyType: "Observacional",
            participants: "Encuesta autoseleccionada de seguidores de dieta carnivora",
            summary: "Describe experiencias positivas declaradas y marcadores comunicados por participantes.",
            limitations: "Autoseleccion, ausencia de grupo control y resultados autoinformados.",
            url: "https://pubmed.ncbi.nlm.nih.gov/?term=carnivore+diet+Lennerz"
          }
        ],
        questions: ["Que cambio produjo el beneficio: mas proteina, menos ultraprocesados o ausencia de plantas?", "Como se mediran seguridad y adherencia a largo plazo?"],
        relatedConcepts: ["Saciedad", "Dieta de eliminacion", "Autoseleccion", "Adherencia"]
      }
    ],
    opposition: [
      {
        id: "carnivora-seguridad-largo-plazo",
        title: "La seguridad y superioridad a largo plazo no estan demostradas",
        summary: "La ausencia de ensayos prolongados limita cualquier conclusion fuerte.",
        evidence: "Moderada",
        consensus: "Medio",
        explanation:
          "La evidencia disponible sugiere beneficios de patrones ricos en fibra y alimentos vegetales para salud cardiometabolica. Una dieta carnivora puede elevar LDL en algunas personas y dificulta alcanzar recomendaciones de fibra. La magnitud del riesgo individual sigue abierta.",
        strengths: ["Se apoya en evidencia mas amplia sobre fibra y riesgo cardiovascular", "Distingue marcadores intermedios de resultados clinicos"],
        limitations: ["La evidencia indirecta no mide necesariamente una dieta carnivora bien formulada", "Existe variabilidad metabolica individual"],
        counterarguments: ["Seguimiento clinico y seleccion de alimentos pueden reducir algunos riesgos, sin demostrar seguridad total"],
        resources: [
          {
            title: "Dietary fiber, cardiovascular disease and mortality",
            authors: "Revisiones y metaanalisis internacionales",
            year: 2023,
            journal: "PubMed",
            studyType: "Metaanalisis",
            participants: "Cohortes y ensayos sobre ingesta de fibra",
            summary: "Busqueda de sintesis sobre fibra dietetica y resultados cardiometabolicos.",
            limitations: "Es evidencia indirecta respecto a la dieta carnivora.",
            url: "https://pubmed.ncbi.nlm.nih.gov/?term=dietary+fiber+cardiovascular+mortality+meta-analysis"
          }
        ],
        questions: ["Que marcadores se controlaran y durante cuanto tiempo?", "Que evidencia demostraria que la restriccion compensa sus riesgos?"],
        relatedConcepts: ["LDL", "Fibra", "Riesgo absoluto", "Nutricion a largo plazo"]
      }
    ],
    known: [
      "No existen ensayos amplios y prolongados que demuestren superioridad de la dieta carnivora.",
      "Puede elevar LDL de forma importante en algunas personas.",
      "Eliminar ultraprocesados no exige eliminar todos los alimentos vegetales."
    ],
    unknown: [
      "Resultados cardiovasculares, renales y oncologicos tras muchos anos.",
      "Que subgrupos toleran peor o mejor este patron.",
      "Como cambia microbiota y funcion intestinal a largo plazo."
    ],
    biases: ["Sesgo del superviviente", "Testimonio", "Efecto halo", "Confirmacion"]
  }
};

function normalizeResource(resource: Resource, index: number): StructuredResource {
  return {
    ...resource,
    type: resource.studyType,
    source: resource.journal,
    level: resource.studyType === "Opinion" ? "Basico" : index === 0 ? "Intermedio" : "Universitario"
  };
}

function normalizeArgument(argument: Argument, index: number, side: "pro" | "con", slug: string): StructuredArgument {
  return {
    ...argument,
    id: argument.id ?? `${slug}-${side}-${index + 1}`,
    summary: argument.summary ?? argument.explanation.split(".")[0],
    questions: argument.questions ?? [
      "Que evidencia podria debilitar este argumento?",
      "En que contextos dejaria de aplicarse?"
    ],
    resources: argument.resources.map(normalizeResource)
  };
}

export const topics: StructuredTopic[] = baseTopics.map((topic) => {
  const merged = {
    ...topic,
    ...(richTopics[topic.slug] ?? {}),
    ...(priorityTopicEnhancements[topic.slug] ?? {})
  };
  const support = merged.support.map((argument, index) => normalizeArgument(argument, index, "pro", merged.slug));
  const opposition = merged.opposition.map((argument, index) => normalizeArgument(argument, index, "con", merged.slug));
  const resources = [...support, ...opposition]
    .flatMap((argument) => argument.resources)
    .filter((resource, index, all) => all.findIndex((candidate) => candidate.url === resource.url) === index);

  return {
    ...merged,
    id: merged.id ?? merged.slug,
    description: merged.description ?? merged.summary,
    support,
    opposition,
    proArguments: support,
    conArguments: opposition,
    whatWeKnow: merged.known,
    whatWeDontKnow: merged.unknown,
    resources
  };
});

validateTopics(topics);

export const trendingTopics = topics.map(({ slug, title, category, status }) => ({ slug, title, category, status }));

export function getTopic(slug: string) {
  return topics.find((topic) => topic.slug === slug);
}
