import Link from "next/link";
import { BrandLogo, logos } from "./brand-logo";
import { Brand, COURSE_HREF, REPO_URL, SPONSOR_URL, TWITTER_URL, cx } from "./ui";
import { VisitCounter } from "./visit-counter";

/** `native`: a plain <a>, so the browser fires `hashchange` (the course page listens for #starter). */
type FooterLink = { label: string; href: string; external?: boolean; native?: boolean };

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Learn",
    links: [
      { label: "The free AI course", href: COURSE_HREF },
      { label: "Starter path", href: `${COURSE_HREF}#starter`, native: true },
      { label: "Questions", href: "/#faq" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "AI app builders", href: "/resources/ai-builders" },
      { label: "GitHub repos", href: "/resources/github" },
      { label: "Website prompts", href: "/resources/website-prompts" },
      { label: "Image prompts", href: "/resources/image-prompts" },
      { label: "YouTube channels", href: "/#resources" },
    ],
  },
  {
    title: "Project",
    links: [
      { label: "Source on GitHub", href: REPO_URL, external: true },
      {
        label: "Report a broken link",
        href: `${REPO_URL}/issues/new?title=${encodeURIComponent("Broken or outdated link: ")}`,
        external: true,
      },
      { label: "Suggest a free lesson", href: `${REPO_URL}/issues/new?title=${encodeURIComponent("Lesson suggestion: ")}`, external: true },
      { label: "MIT License", href: `${REPO_URL}/blob/main/LICENSE`, external: true },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms and conditions", href: "/terms" },
    ],
  },
];

function FooterAnchor({ link, className }: { link: FooterLink; className?: string }) {
  const cls = cx("text-muted transition-colors hover:text-ink", className);
  return link.external ? (
    <a href={link.href} target="_blank" rel="noopener noreferrer" className={cls}>
      {link.label}
    </a>
  ) : link.native ? (
    <a href={link.href} className={cls}>
      {link.label}
    </a>
  ) : (
    <Link href={link.href} className={cls}>
      {link.label}
    </Link>
  );
}

/** Site-wide footer used on every page. `note` adds a page-specific line (e.g. link review date). */
export function SiteFooter({ note }: { note?: string }) {
  return (
    <footer className="border-t border-line bg-paper text-ink">
      <div className="wrap grid grid-cols-[1.4fr_repeat(5,1fr)] gap-10 py-14 max-xl:grid-cols-3 max-md:grid-cols-2 max-md:gap-8 max-md:py-10">
        <div className="max-xl:col-span-3 max-md:col-span-2">
          <Brand size="text-[22px]" />
          <p className="mt-3 mb-0 max-w-[300px] text-[13px] leading-[1.7] text-muted">
            Free AI lessons from the people who make the tools, in order. No fee, no account.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <a
              href={SPONSOR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-[8px] border border-line px-3 py-2 text-[12px] font-semibold transition-colors hover:border-ink"
            >
              <BrandLogo logo={logos.githubSponsors} size={14} />
              Sponsor
              <span className="font-normal text-muted">(optional)</span>
            </a>
            <VisitCounter className="rounded-full border border-line px-3 py-1.5 text-[12px] text-muted" />
          </div>
        </div>

        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="mb-4 font-sans text-[11px] font-extrabold tracking-[1.4px] text-ink uppercase">{col.title}</h2>
            <ul className="m-0 flex list-none flex-col gap-2.5 p-0 text-[13px]">
              {col.links.map((link) => (
                <li key={link.label}>
                  <FooterAnchor link={link} />
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <nav aria-label="Connect">
          <h2 className="mb-4 font-sans text-[11px] font-extrabold tracking-[1.4px] text-ink uppercase">Connect</h2>
          <ul className="m-0 flex list-none flex-col gap-2.5 p-0 text-[13px]">
            <li>
              <a
                href={TWITTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-muted transition-colors hover:text-ink"
              >
                <BrandLogo logo={logos.x} size={13} /> @krutikkkkkkkkk
              </a>
            </li>
            <li>
              <a
                href="https://github.com/krutikkkkkkkkk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-muted transition-colors hover:text-ink"
              >
                <BrandLogo logo={logos.github} size={13} /> GitHub
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-line">
        <div className="wrap flex justify-between gap-8 py-6 text-[11px] leading-[1.7] text-muted max-md:flex-col max-md:gap-3">
          <p className="m-0 shrink-0">
            © 2026 Krutik Raut · Code under the MIT License
            {note && (
              <>
                <br />
                {note}
              </>
            )}
          </p>
          <p className="m-0 max-w-[620px] text-right max-md:text-left">
            Every lesson belongs to its publisher and opens on their site. Logos are trademarks of their owners, used only
            to identify them; no endorsement is implied. An independent parody, not affiliated with Zero to Infinity with
            AI; satire is not an allegation of misconduct.
          </p>
        </div>
      </div>
    </footer>
  );
}
