import { BackLink } from "@/components/back-link";
import { PageFrame, SiteHeader } from "@/components/site-shell";

export function ToolPageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <PageFrame>
        <BackLink />
        {children}
      </PageFrame>
    </>
  );
}
