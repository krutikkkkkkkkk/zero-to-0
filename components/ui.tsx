import type { ReactNode } from "react";

/** Join class names, skipping falsy values. */
export const cx = (...parts: (string | false | null | undefined)[]) => parts.filter(Boolean).join(" ");

/**
 * Small all-caps label above headings. Pass `size` to change the font size and
 * bottom margin together (defaults to the original 10px / 20px).
 */
export function Eyebrow({
  children,
  size = "text-[10px] mb-5",
  className,
}: {
  children: ReactNode;
  size?: string;
  className?: string;
}) {
  return <span className={cx("block font-extrabold leading-[1.6] tracking-[1.6px]", size, className)}>{children}</span>;
}

/** Shared look of the dark pill button. Size classes are passed separately so they never conflict. */
export const buttonBase =
  "inline-flex items-center justify-center bg-ink text-paper font-bold border border-ink rounded-[9px] transition-[translate,background-color] duration-200 hover:bg-[#40382f] hover:-translate-y-0.5";
export const buttonSize = "gap-[22px] px-6 py-[17px] text-[13px]";

export const textLink = "inline-flex items-center gap-2.5 border-b border-ink pb-1 text-[12px] font-bold";

export const receiptDash = "my-[21px] border-t border-dashed border-[#b9b0a5]";

export function Brand({ size = "text-[24px] max-md:text-[22px]" }: { size?: string }) {
  return (
    <a className={cx("flex items-baseline gap-[5px] whitespace-nowrap font-serif tracking-[-1px]", size)} href="#top">
      Zero to <span className="inline-block -rotate-5 bg-marker px-1 leading-[1.2]">₹0</span>
      <i className="ml-[3px] font-sans text-[9px] font-normal not-italic leading-[normal] tracking-normal max-xs:hidden">
        with AI
      </i>
    </a>
  );
}
