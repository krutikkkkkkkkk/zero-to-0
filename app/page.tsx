import type { Metadata } from "next";
import { Closing, Faq, Manifesto, Money } from "@/components/closing-sections";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/hero";
import { LearnModules } from "@/components/learn-modules";
import { ResourceDirectory } from "@/components/resource-directory";
import { SiteHeader } from "@/components/site-header";
import { Formula, Why } from "@/components/why-and-formula";
import { SITE_URL } from "@/lib/share";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const siteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Zero to ₹0",
  url: SITE_URL,
  description: "A free, open-source AI course built from the best free lessons, in order. Learn AI and keep your money.",
  inLanguage: "en-IN",
  publisher: { "@type": "Person", name: "Krutik Raut", url: "https://x.com/krutikkkkkkkkk" },
};

export default function Home() {
  return (
    <>
      <JsonLd data={siteJsonLd} />
      <SiteHeader topBar />
      <main id="top">
        <Hero />
        <Why />
        <Formula />
        <LearnModules />
        <ResourceDirectory />
        <Money />
        <Manifesto />
        <Faq />
        <Closing />
      </main>
      <SiteFooter />
    </>
  );
}
