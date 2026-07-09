import { AnalysisDemo } from "@/components/analysis-demo";
import { ToolPageShell } from "@/components/tool-page-shell";

export default function TikTokPage() {
  return (
    <ToolPageShell>
      <AnalysisDemo mode="tiktok" />
    </ToolPageShell>
  );
}
