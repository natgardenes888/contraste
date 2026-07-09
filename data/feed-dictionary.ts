export type FeedSignal = {
  phrase: string;
  tone: string;
  criticalQuestion: string;
  trap: string;
  criticalMove: string;
  topicSlug: string;
  aliases: string[];
};

export const feedDictionary: FeedSignal[] = [
  {
    phrase: "Energia femenina / divine feminine",
    tone: "Se vende como suavidad, intuicion y magnetismo romantico.",
    criticalQuestion: "Empodera de verdad o recicla roles de genero con lenguaje espiritual?",
    trap: "Confundir bienestar personal con una regla universal sobre como debe ser una mujer.",
    criticalMove: "Separar lo que te calma de lo que te encierra.",
    topicSlug: "trad-wives",
    aliases: ["energia femenina", "divine feminine", "feminine energy", "mujer femenina", "energia masculina", "hombre proveedor", "provider mindset"]
  },
  {
    phrase: "Hombre alfa / masculinidad fuerte",
    tone: "Promete respeto, deseo y control personal.",
    criticalQuestion: "Que parte es autocuidado y que parte convierte inseguridad en dominio?",
    trap: "Tomar dolor real y convertirlo en una teoria total sobre mujeres, estatus y poder.",
    criticalMove: "Preguntar si el consejo aumenta responsabilidad o aumenta resentimiento.",
    topicSlug: "masculinidad-contemporanea",
    aliases: ["hombre alfa", "masculinidad fuerte", "masculinidad toxica", "masculinidad positiva", "ser mas hombre", "disciplina masculina"]
  },
  {
    phrase: "NoFap / dejar el porno",
    tone: "Aparece como reset mental, energia y recuperacion de deseo.",
    criticalQuestion: "Hay un problema real de uso compulsivo o una explicacion moral disfrazada de ciencia?",
    trap: "Convertir una experiencia personal de mejora en una ley biologica para todo el mundo.",
    criticalMove: "Distinguir uso problematico, culpa moral y evidencia clinica.",
    topicSlug: "pornografia-y-relaciones",
    aliases: ["nofap", "dejar el porno", "adiccion al porno", "pornografia", "semen retention", "retencion seminal"]
  },
  {
    phrase: "Ayuno de dopamina",
    tone: "Promete recuperar foco eliminando placer rapido.",
    criticalQuestion: "Sirve para ordenar habitos o simplifica demasiado como funciona el cerebro?",
    trap: "Creer que la dopamina es una toxina que se vacia y se rellena.",
    criticalMove: "Traducirlo a conducta: senales, habitos, descanso y atencion.",
    topicSlug: "ayuno-de-dopamina",
    aliases: ["dopamine detox", "detox de dopamina", "ayuno dopamina", "sobreestimulacion", "reset dopamina"]
  },
  {
    phrase: "Salir de la matrix laboral",
    tone: "Mezcla antiwork, libertad financiera y rechazo a la oficina.",
    criticalQuestion: "Es critica legitima al trabajo precario o fantasia de escape sin plan material?",
    trap: "Confundir critica al sistema con promesas faciles de independencia inmediata.",
    criticalMove: "Separar diagnostico laboral, estrategia economica y marketing de gurus.",
    topicSlug: "trabajo-remoto",
    aliases: ["salir de la matrix", "no quiero trabajar", "antiwork", "renuncia silenciosa", "quiet quitting", "libertad financiera", "trabajo remoto"]
  },
  {
    phrase: "La IA te va a quitar el trabajo",
    tone: "Convierte una transicion compleja en miedo inmediato.",
    criticalQuestion: "Que tareas estan realmente expuestas y que depende de politica, formacion y adopcion?",
    trap: "Pensar en profesiones enteras cuando la automatizacion suele empezar por tareas.",
    criticalMove: "Mirar exposicion por tarea, capacidad de adaptacion y poder de negociacion.",
    topicSlug: "ia-reemplazara-empleos",
    aliases: ["ia me quitara el trabajo", "ia reemplaza empleos", "automatizacion", "chatgpt trabajo", "perder empleo ia"]
  },
  {
    phrase: "Manifestar tu realidad",
    tone: "Une espiritualidad, autoestima y control total del destino.",
    criticalQuestion: "Ayuda a actuar con esperanza o culpa a la persona cuando la vida no obedece?",
    trap: "Convertir esperanza en culpa: si no ocurre, es porque no vibraste bien.",
    criticalMove: "Quedarse con intencion y accion sin negar azar, estructura y limites.",
    topicSlug: "mindfulness-y-espiritualidad",
    aliases: ["manifestar", "ley de atraccion", "manifestacion", "vibrar alto", "abundancia", "visualizacion"]
  },
  {
    phrase: "Poliamor / relacion abierta",
    tone: "Se presenta como libertad afectiva o como caos romantico.",
    criticalQuestion: "Hay consentimiento real, acuerdos y cuidado, o solo miedo a perder a alguien?",
    trap: "Usar palabras de libertad para tapar presion, celos no trabajados o desigualdad.",
    criticalMove: "Preguntar si el acuerdo seria igual de libre si la persona pudiera irse sin perderlo todo.",
    topicSlug: "poliamor-y-monogamia",
    aliases: ["poliamor", "relacion abierta", "no monogamia", "monogamia consciente", "celos", "pareja abierta"]
  },
  {
    phrase: "Trad wife / esposa tradicional",
    tone: "Romantiza hogar, feminidad, maternidad y dependencia estetizada.",
    criticalQuestion: "Es una eleccion libre o una fantasia que oculta dinero, poder y riesgo de salida?",
    trap: "Mirar la estetica del hogar sin mirar pension, ahorro, contrato y capacidad de salida.",
    criticalMove: "Evaluar belleza, deseo y consecuencias materiales a la vez.",
    topicSlug: "trad-wives",
    aliases: ["trad wife", "tradwife", "esposa tradicional", "stay at home girlfriend", "ama de casa", "mujer tradicional"]
  },
  {
    phrase: "Cultura woke / censura",
    tone: "Agrupa correccion politica, cancelacion y moderacion de contenido.",
    criticalQuestion: "Estamos ante censura, responsabilidad social o conflicto por poder cultural?",
    trap: "Meter en la misma bolsa critica social, despido, moderacion privada y censura estatal.",
    criticalMove: "Nombrar quien tiene poder, que sancion aplica y que derecho esta en juego.",
    topicSlug: "libertad-de-expresion-y-desinformacion",
    aliases: ["woke", "cultura woke", "cancelacion", "cancel culture", "censura", "correccion politica", "desinformacion"]
  },
  {
    phrase: "Apropiacion cultural",
    tone: "Explota cuando moda, musica, comida o disfraces cruzan identidades.",
    criticalQuestion: "Hay homenaje e intercambio, o borrado, burla y beneficio sin reconocimiento?",
    trap: "Tratar toda mezcla como robo o todo dano simbolico como exageracion.",
    criticalMove: "Buscar contexto, credito, lucro, permiso y relacion de poder.",
    topicSlug: "apropiacion-cultural",
    aliases: ["apropiacion cultural", "cultural appropriation", "trenzas", "disfraz cultural", "cultura robada"]
  },
  {
    phrase: "4B / no salir con hombres",
    tone: "Se comparte como protesta radical y como limite emocional.",
    criticalQuestion: "Es una estrategia de seguridad y protesta o una identidad que cierra matices?",
    trap: "Convertir un limite politico o personal en explicacion unica de todas las relaciones.",
    criticalMove: "Distinguir seguridad, protesta, estrategia colectiva y cierre dogmatico.",
    topicSlug: "feminismo-4b",
    aliases: ["4b", "feminismo 4b", "no salir con hombres", "no matrimonio", "no maternidad", "separatismo feminista"]
  }
];

export function signalsForTopic(slug: string) {
  return feedDictionary.filter((signal) => signal.topicSlug === slug);
}
