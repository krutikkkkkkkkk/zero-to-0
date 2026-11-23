"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const resourcePages = [
  { href: "/resources", label: "All resources" },
  { href: "/resources/ai-builders", label: "AI app builders" },
  { href: "/resources/github", label: "GitHub repos" },
  { href: "/resources/website-prompts", label: "Website prompts" },
  { href: "/resources/image-prompts", label: "Image prompts" },
];

/** Tabs across the Resources section. */
export function ResourcesNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Resources" className="flex gap-1 overflow-x-auto pb-1">
      {resourcePages.map((p) => {
        const current = pathname === p.href;
        return (
          <Link
            key={p.href}
            href={p.href}
            aria-current={current ? "page" : undefined}
            className="shrink-0 rounded-[7px] border border-line px-3.5 py-2 text-[13px] font-semibold whitespace-nowrap hover:border-ink aria-[current=page]:border-ink aria-[current=page]:bg-ink aria-[current=page]:text-paper"
          >
            {p.label}
          </Link>
        );
      })}
    </nav>
  );
}
