"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Brand, COURSE_HREF, buttonBase, cx } from "./ui";

/** Absolute links ("/#why", not "#why") so the same navbar works from every page. */
const links = [
  { href: "/#why", label: "Why ₹0" },
  { href: "/#learn", label: "What you'll learn" },
  { href: COURSE_HREF, label: "Free course" },
  { href: "/resources", label: "Resources" },
  { href: "/#faq", label: "Questions" },
];

/**
 * The one navbar used on every page.
 * - `topBar`: the black parody strip above it (home page only).
 * - `sticky`: off on the course page, whose own progress/filter bar sticks to the top instead.
 */
export function SiteHeader({ topBar = false, sticky = true }: { topBar?: boolean; sticky?: boolean }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the mobile menu with Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {topBar && (
        <div className="flex h-[34px] items-center justify-between bg-ink px-[max(40px,calc((100%_-_1120px)/2))] text-[8px] tracking-[1.3px] text-paper max-md:h-[29px] max-md:justify-center max-md:px-[15px] max-md:text-[6px]">
          <span>AN INDEPENDENT PARODY. A VERY REAL FREE RESOURCE GUIDE.</span>
          <Link href="/#resources" className="flex items-center gap-[7px] text-[10px] tracking-[0.2px] hover:underline max-md:hidden">
            Skip the pitch. Get the links <ArrowUpRight size={13} aria-hidden />
          </Link>
        </div>
      )}

      <header
        className={cx(
          "z-30 border-b border-line bg-[#fffaf0f2] backdrop-blur-[12px]",
          sticky ? "sticky top-0" : "relative",
        )}
      >
        <div className="wrap flex h-[85px] items-center justify-between gap-[30px] max-md:h-[72px] max-md:gap-[15px]">
          <Brand />
          <nav
            id="site-nav"
            aria-label="Main"
            className={cx(
              "ml-auto flex gap-[29px] text-[11px] font-semibold max-xl:gap-[17px]",
              "max-md:absolute max-md:top-full max-md:left-0 max-md:w-full max-md:flex-col max-md:gap-0 max-md:border-b max-md:border-line max-md:bg-paper max-md:px-5 max-md:pb-3 max-md:text-[15px] max-md:shadow-[0_18px_30px_#5e46230f]",
              open ? "max-md:flex" : "max-md:hidden",
            )}
          >
            {links.map((l) => {
              const current = l.href === pathname || (l.href === "/resources" && pathname.startsWith("/resources/"));
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={current ? "page" : undefined}
                  className={cx(
                    "underline-offset-[6px] decoration-1 hover:underline max-md:border-b max-md:border-line max-md:py-3.5 max-md:last:border-b-0",
                    current && "underline decoration-2",
                  )}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>
          <Link
            href={COURSE_HREF}
            className={cx(
              buttonBase,
              "gap-4 px-[18px] py-[11px] text-[11px] max-md:ml-auto max-md:gap-[7px] max-md:px-3 max-md:py-2.5 max-md:text-[10px]",
            )}
          >
            Start · ₹0 <ArrowUpRight size={16} aria-hidden />
          </Link>
          <button
            type="button"
            className="hidden border-0 bg-transparent max-md:flex max-md:p-[2px]"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-controls="site-nav"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </header>
    </>
  );
}
