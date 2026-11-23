import { ArrowUpRight, Check } from "lucide-react";
import { faqs } from "@/lib/content";
import { Brand, Eyebrow, buttonBase, buttonSize, cx, receiptDash } from "./ui";

const perks = [
  "Five learning themes, from tools to building",
  "Public tutorials with creator credit",
  "Practical tasks you can actually try",
  "Browser-saved practice progress",
  "Honest warnings about external tool costs",
];

const priceLines: [string, string, boolean?][] = [
  ["Dinner for two", "Depends where you eat"],
  ["Movie night", "Depends where you watch"],
  ["This learning guide", "₹0", true],
];

export function Money() {
  return (
    <section className="wrap section-y grid grid-cols-[1.3fr_1fr] items-center gap-[95px] max-xl:gap-[45px] max-md:grid-cols-1 max-md:gap-[35px]">
      <div>
        <Eyebrow>EVERYTHING YOU GET</Eyebrow>
        <h2 className="text-[41px] max-md:text-[34px] max-md:tracking-[-1.2px]">
          Your learning path.
          <br />
          Without the <em>checkout plot twist.</em>
        </h2>
        <ul className="my-[30px] list-none p-0">
          {perks.map((t) => (
            <li key={t} className="my-[14px] flex items-center gap-[11px] text-[12px]">
              <Check size={17} />
              {t}
            </li>
          ))}
        </ul>
        <p className="text-[12px] text-muted">
          No job guarantees. No passive-income prophecies.
          <br />
          No wall of consulting logos watching you learn.
        </p>
      </div>

      <div className="rounded-[15px] border border-[#dfcd79] bg-[#fff3b0] p-8 max-md:p-7">
        <Eyebrow size="text-[8px] mb-5">ONE PAYMENT OF ABSOLUTELY NOTHING</Eyebrow>
        <div className="font-serif text-[90px] leading-[1.1] tracking-[-5px]">
          ₹0
          <span className="ml-[15px] font-sans text-[11px] leading-[normal] tracking-normal text-[#716544]">/ forever*</span>
        </div>
        <p className="mt-[15px] mb-[23px] text-[12px] leading-[1.8]">
          That&apos;s about ₹0 a month.
          <br />
          We checked the maths twice.
        </p>
        <a className={cx(buttonBase, buttonSize, "w-full")} href="#learn">
          Start learning free <ArrowUpRight size={18} />
        </a>
        <div className={receiptDash} />
        {priceLines.map(([label, value, bold]) => (
          <div key={label} className={cx("my-[11px] flex justify-between gap-3 text-[9px]", bold && "font-extrabold")}>
            <span>{label}</span>
            <span>{value}</span>
          </div>
        ))}
        <small className="mt-[22px] block text-[8px] text-[#716544]">
          *No enrollment expiry. External links can change.
          <br />
          Your internet and optional tools aren&apos;t included.
        </small>
      </div>
    </section>
  );
}

export function Manifesto() {
  return (
    <section className="overflow-hidden bg-marker py-[66px] max-md:py-[55px]">
      <div className="wrap relative">
        <Eyebrow size="text-[9px] mb-5">OUR NO-FOMO PROMISE</Eyebrow>
        <h2 className="max-w-[750px] text-[58px] max-md:w-[85%] max-md:text-[42px] max-md:tracking-[-1.5px]">
          You are allowed to miss
          <br />
          <em>a model launch.</em>
        </h2>
        <p className="mb-0 text-[14px]">
          Learn. Practice. Decide what support you need.
          <br />
          In that order.
        </p>
        <span className="absolute top-0 right-0 rotate-15 font-[Georgia,serif] text-[170px] leading-none max-xl:text-[135px] max-md:top-[75px] max-md:-right-2.5 max-md:text-[64px]">
          ✳
        </span>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section
      id="faq"
      className="wrap section-y grid grid-cols-[1fr_1.5fr] gap-[85px] max-md:grid-cols-1 max-md:gap-[35px]"
    >
      <div>
        <Eyebrow>FAIR QUESTIONS</Eyebrow>
        <h2 className="text-[44px] max-md:text-[37px]">
          You might be
          <br className="max-md:hidden" /> <em>wondering...</em>
        </h2>
        <p className="text-[12px] text-muted">
          Yes, we included the refund question.
          <br />
          No, your ₹0 is not at risk.
        </p>
      </div>
      <div className="border-t border-line">
        {faqs.map(([q, a]) => (
          <details key={q} className="group border-b border-line">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-[18px] py-[19px] text-[12px] font-semibold">
              {q}
              <span className="text-[22px] leading-none font-normal group-open:rotate-45">+</span>
            </summary>
            <p className="mt-0 mr-[26px] mb-[22px] ml-0 text-[12px] leading-[1.9] text-muted">{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function Closing() {
  return (
    <section className="wrap mb-16 rounded-[18px] border border-line bg-[#fff6d5] px-[25px] pt-[68px] pb-[75px] text-center max-md:mb-[45px] max-md:px-5 max-md:py-[45px]">
      <Eyebrow size="text-[10px] mb-5 max-md:text-[8px]">LESS CHECKOUT. MORE CHECKING THE OUTPUT.</Eyebrow>
      <h2 className="text-[52px] max-md:text-[37px] max-md:tracking-[-1.2px]">
        A course ends. AI doesn&apos;t.
        <br />
        <em>Neither does YouTube.</em>
      </h2>
      <p className="mt-5 mb-[26px] text-[14px] text-muted max-md:text-[12px]">
        Stop collecting promises. Start completing projects.
      </p>
      <a className={cx(buttonBase, buttonSize)} href="#learn">
        Learn AI. Keep your money. <ArrowUpRight size={18} />
      </a>
      <small className="mt-[15px] block text-[9px] text-muted">No course fee. Effort, tragically, still required.</small>
    </section>
  );
}

export function SiteFooter() {
  const meta = "text-[9px] text-muted";
  return (
    <footer className="wrap flex justify-between gap-[30px] border-t border-line pt-8 pb-[45px] max-md:flex-col max-md:gap-2 max-md:pb-[55px]">
      <div>
        <Brand size="text-[21px]" />
        <p className={cx("my-3 leading-[1.8]", meta)}>Independent parody. Useful links. No affiliation.</p>
      </div>
      <div className="text-right max-md:text-left">
        <p className={cx("my-3 leading-[1.8]", meta)}>
          Not affiliated with Zero to Infinity with AI, its instructors,
          <br />
          or the creators linked here. Satire is not an allegation of misconduct.
        </p>
        <a href="#resources" className={cx("border-b border-[#b9b0a5]", meta)}>
          Creator credits
        </a>
        <span className={meta}> · </span>
        <a href="#faq" className={cx("border-b border-[#b9b0a5]", meta)}>
          Access &amp; privacy
        </a>
      </div>
    </footer>
  );
}
