import { ResourcesNav } from "@/components/resources/resources-nav";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function ResourcesLayout({ children }: LayoutProps<"/resources">) {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <SiteHeader />
      <div className="wrap pt-10 max-md:pt-6">
        <ResourcesNav />
      </div>
      <main className="wrap pt-10 pb-20 max-md:pt-8">{children}</main>
      <SiteFooter />
    </div>
  );
}
