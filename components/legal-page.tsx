import type { ReactNode } from "react";
import Link from "next/link";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { Eyebrow, TWITTER_URL } from "./ui";

/** Shared layout for the Privacy and Terms pages. */
export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <SiteHeader />
      <main className="wrap max-w-[720px] pt-14 pb-20 max-md:pt-10">
        <nav aria-label="Legal pages" className="mb-8 flex gap-2 text-[12px] font-semibold">
          {[
            { href: "/privacy", label: "Privacy" },
            { href: "/terms", label: "Terms and conditions" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={l.label.startsWith(title.split(" ")[0]) ? "page" : undefined}
              className="rounded-[6px] border border-line px-3 py-1.5 hover:border-ink aria-[current=page]:border-ink aria-[current=page]:bg-ink aria-[current=page]:text-paper"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <Eyebrow>LAST UPDATED {updated.toUpperCase()}</Eyebrow>
        <h1 className="text-[52px] leading-[1.05] tracking-[-2px] max-md:text-[38px]">{title}</h1>
        <div className="mt-8 text-[15px] leading-[1.75] [&_a]:border-b [&_a]:border-ink [&_h2]:mt-12 [&_h2]:mb-3 [&_h2]:text-[26px] [&_h2]:tracking-[-0.8px] [&_li]:my-2 [&_p]:my-4 [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6">
          {children}
        </div>
        <p className="mt-14 border-t border-line pt-6 text-[13px] text-muted">
          Questions? Message{" "}
          <a href={TWITTER_URL} target="_blank" rel="noopener noreferrer" className="border-b border-line text-ink">
            @krutikkkkkkkkk on X
          </a>{" "}
          or open an issue on{" "}
          <a
            href="https://github.com/krutikkkkkkkkk/zero-to-0/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-line text-ink"
          >
            GitHub
          </a>
          .
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
