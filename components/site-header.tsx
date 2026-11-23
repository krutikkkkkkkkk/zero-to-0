"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Brand, COURSE_HREF, buttonBase, cx } from "./ui";

const links = [
  { href: "#why", label: "Why ₹0" },
  { href: "#learn", label: "What you'll learn" },
  { href: "#resources", label: "Free resources" },
  { href: "#faq", label: "Questions" },
  { href: COURSE_HREF, label: "Free course" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex h-[34px] items-center justify-between bg-ink px-[max(40px,calc((100%_-_1120px)/2))] text-[8px] tracking-[1.3px] text-paper max-md:h-[29px] max-md:justify-center max-md:px-[15px] max-md:text-[6px]">
        <span>AN INDEPENDENT PARODY. A VERY REAL FREE RESOURCE GUIDE.</span>
        <a href="#resources" className="flex items-center gap-[7px] text-[10px] tracking-[0.2px] max-md:hidden">
          Skip the pitch. Get the links <ArrowUpRight size={13} />
        </a>
      </div>

      <header className="sticky top-0 z-20 border-b border-line bg-[#fffaf0f2] backdrop-blur-[12px]">
        <div className="wrap flex h-[85px] items-center justify-between gap-[30px] max-md:h-[72px] max-md:gap-[15px]">
          <Brand />
          <nav
            className={cx(
              "ml-auto flex gap-[29px] text-[11px] font-semibold max-xl:gap-[17px]",
              "max-md:absolute max-md:top-[72px] max-md:left-0 max-md:w-full max-md:flex-col max-md:border-b max-md:border-line max-md:bg-paper max-md:p-5 max-md:text-[13px]",
              open ? "max-md:flex" : "max-md:hidden",
            )}
          >
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="hover:border-b">
                {l.label}
              </Link>
            ))}
          </nav>
          <Link
            href={COURSE_HREF}
            className={cx(
              buttonBase,
              "gap-4 px-[18px] py-[11px] text-[11px] max-md:ml-auto max-md:gap-[7px] max-md:px-3 max-md:py-2.5 max-md:text-[10px]",
            )}
          >
            Start · ₹0 <ArrowUpRight size={16} />
          </Link>
          <button
            type="button"
            className="hidden border-0 bg-transparent max-md:flex max-md:p-[2px]"
            aria-label="Toggle navigation"
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
