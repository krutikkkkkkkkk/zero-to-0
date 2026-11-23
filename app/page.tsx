import { Closing, Faq, Manifesto, Money } from "@/components/closing-sections";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/hero";
import { LearnModules } from "@/components/learn-modules";
import { ResourceDirectory } from "@/components/resource-directory";
import { SiteHeader } from "@/components/site-header";
import { Formula, Why } from "@/components/why-and-formula";

export default function Home() {
  return (
    <>
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
