# CONTRASTE

Beta ampliada de una plataforma para fomentar pensamiento critico con fichas estructuradas de evidencias, argumentos, contraargumentos, recursos y conceptos relacionados.

## Decisiones principales

- Next.js, React, TypeScript y Tailwind CSS para una base moderna, tipada y facil de desplegar en Vercel.
- Contenido principal en una base estructurada (`data/topics.ts`) para evitar respuestas inventadas.
- Componentes reutilizables para tarjetas, cabecera, evidencias, tipos de estudio y argumentos desplegables.
- Catalogo inicial con 20 temas semilla repartidos por las categorias principales.
- Interfaz mas colorida y animada, con tarjetas por categoria, paneles vivos y microinteracciones.
- El analizador, el otro punto de vista y la lectura critica funcionan localmente con la biblioteca editorial, sin API, cuenta ni coste.
- Supabase encajaria como fuente persistente para temas, autores, estudios, argumentos, conceptos y relaciones entre entidades.

## Como ejecutar

```bash
npm install
npm run dev
```

Despues abre `http://localhost:3000`.

## Siguiente paso recomendado

Mover `data/topics.ts` a Supabase con tablas separadas para:

- `topics`
- `arguments`
- `resources`
- `authors`
- `concepts`
- `biases`
- `topic_relations`

Asi cada afirmacion puede mantener trazabilidad hacia estudios, autores, evidencia y contraargumentos.
