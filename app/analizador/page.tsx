import { AnalysisDemo } from "@/components/analysis-demo";
import { ToolPageShell } from "@/components/tool-page-shell";

export default function AnalyzerPage({ searchParams }: { searchParams: { q?: string } }) {
  return (
    <ToolPageShell>
      <AnalysisDemo mode="claim" initialText={searchParams.q} />
    </ToolPageShell>
  );
}
