import { NextResponse } from "next/server";
import { buildAcademicAnalysis } from "@/lib/academic-search";
import { buildTopicAnalysis, type AnalysisMode } from "@/lib/local-analysis";
import { findTopicMatch } from "@/lib/topic-match";

export const runtime = "nodejs";

const modes = new Set<AnalysisMode>(["claim", "devil", "tiktok"]);

export async function POST(request: Request) {
  try {
    const body = await request.json() as { query?: unknown; mode?: unknown };
    const query = typeof body.query === "string" ? body.query.trim() : "";
    const mode = typeof body.mode === "string" && modes.has(body.mode as AnalysisMode)
      ? body.mode as AnalysisMode
      : "claim";

    if (query.length < 8 || query.length > 1200) {
      return NextResponse.json({ error: "Escribe una pregunta de entre 8 y 1200 caracteres." }, { status: 400 });
    }

    const topic = findTopicMatch(query);
    const analysis = topic
      ? buildTopicAnalysis(topic, query, mode)
      : await buildAcademicAnalysis(query, mode);

    return NextResponse.json(analysis);
  } catch {
    return NextResponse.json({ error: "No se pudo completar la búsqueda." }, { status: 500 });
  }
}
