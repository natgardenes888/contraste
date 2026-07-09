import { AnalysisDemo } from "@/components/analysis-demo";
import { ToolPageShell } from "@/components/tool-page-shell";

export default function DevilPage() {
  return (
    <ToolPageShell>
      <AnalysisDemo mode="devil" />
    </ToolPageShell>
  );
}
