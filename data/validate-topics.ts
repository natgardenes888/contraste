import type { StructuredTopic } from "@/data/topics";

export function validateTopics(topics: StructuredTopic[]) {
  const topicIds = new Set<string>();
  const slugs = new Set<string>();

  for (const topic of topics) {
    assertUnique(topic.id, topicIds, `ID de tema duplicado: ${topic.id}`);
    assertUnique(topic.slug, slugs, `Slug de tema duplicado: ${topic.slug}`);
    assertText(topic.title, `El tema ${topic.slug} no tiene titulo`);
    assertText(topic.description, `El tema ${topic.slug} no tiene descripcion`);
    assertText(topic.category, `El tema ${topic.slug} no tiene categoria`);

    if (!topic.support.length || !topic.opposition.length) {
      throw new Error(`El tema ${topic.slug} necesita argumentos a favor y en contra`);
    }

    const argumentIds = new Set<string>();
    for (const argument of [...topic.support, ...topic.opposition]) {
      assertUnique(argument.id, argumentIds, `Argumento duplicado en ${topic.slug}: ${argument.id}`);
      assertText(argument.title, `Argumento sin titulo en ${topic.slug}`);
      assertText(argument.explanation, `Argumento sin explicacion en ${topic.slug}`);

      if (!argument.questions.length) {
        throw new Error(`El argumento ${argument.id} no tiene preguntas criticas`);
      }
      if (!argument.resources.length) {
        throw new Error(`El argumento ${argument.id} no tiene recursos`);
      }

      for (const resource of argument.resources) {
        assertText(resource.title, `Recurso sin titulo en ${argument.id}`);
        if (!isHttpUrl(resource.url)) {
          throw new Error(`URL no valida en ${argument.id}: ${resource.url}`);
        }
      }
    }
  }
}

function assertUnique(value: string, seen: Set<string>, message: string) {
  if (seen.has(value)) throw new Error(message);
  seen.add(value);
}

function assertText(value: string, message: string) {
  if (!value.trim()) throw new Error(message);
}

function isHttpUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}
