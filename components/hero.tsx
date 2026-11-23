import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { BrandLogo, type LogoKey, logos } from "./brand-logo";
import { COURSE_HREF, buttonBase, buttonSize, cx, receiptDash, textLink } from "./ui";

const receiptRows: [string, string][] = [
  ["Public tutorials", "₹0"],
  ["Useful learning path", "₹0"],
  ["Practice & projects", "Your effort"],
  ["Fear of missing out", "Removed"],
];

const tools: [LogoKey, string][] = [
  ["openai", "ChatGPT"],
  ["gemini", "Gemini"],
  ["claude", "Claude"],
  ["n8n", "n8n"],
  ["google", "NotebookLM"],
  ["wisprflow", "Wispr Flow"],
];

export function Hero() {
  return (
    <>
      <section className="wrap grid grid-cols-[1.3fr_1fr] items-center gap-[70px] pt-[67px] pb-[78px] max-xl:gap-[25px] max-md:grid-cols-1 max-md:gap-[26px] max-md:pt-[42px] max-md:pb-10">
        <div className="lg:animate-[reveal_0.65s_both]">
          <div className="mb-[23px] inline-flex items-center gap-2 rounded-[30px] border border-line px-3 py-[7px] text-[8px] font-extrabold leading-[1.6] tracking-[1px]">
            <span className="size-1.5 rounded-full bg-[#b29b24]" /> SAME INTERNET. DIFFERENT CHECKOUT.
          </div>
          <h1 className="relative max-w-[500px] text-[88px] leading-[1.02] tracking-[-4px] max-xl:text-[78px] max-md:text-[70px] max-md:tracking-[-3px] max-xs:text-[62px]">
            Learn AI.
            <br />
            Keep your
            <br className="max-md:hidden" />{" "}
            <span className="relative z-[1] inline-block before:absolute before:inset-[10px_-8px_0_-5px] before:-z-[1] before:-rotate-2 before:bg-marker">
              ₹10,000.
            </span>
            <span className="mt-[11px] ml-[22px] inline-block -rotate-8 align-top font-[Georgia,serif] text-[61px] text-[#a88c19] max-md:ml-[13px] max-md:text-[40px] max-xs:ml-[5px] max-xs:text-[33px]">
              ✳
            </span>
          </h1>
          <p className="mt-[26px] mb-3 text-[19px] leading-[1.6] max-md:text-[17px]">
            Don&apos;t just buy an AI course once.
            <br />
            <strong>Keep your money for 12 months.</strong>
          </p>
          <p className="mt-0 max-w-[410px] text-[13px] leading-[1.8] text-muted max-md:max-w-full">
            The tools. The workflows. The agents. A practical learning path built from free public tutorials—not
            another payment page.
          </p>
          <div className="mt-7 flex items-center gap-[22px] max-xl:gap-[15px] max-md:flex-wrap max-md:gap-5">
            <Link href={COURSE_HREF} className={cx(buttonBase, buttonSize)}>
              Start learning · ₹0 <ArrowUpRight size={18} />
            </Link>
            <a href="#resources" className={cx(textLink, "max-xl:text-[10px]")}>
              Just give me the links <ArrowRight size={16} />
            </a>
          </div>
          <div className="mt-[17px] flex items-center gap-2 text-[10px] leading-[1.6] text-muted">
            <Check size={14} /> No course fee <span>·</span> No credit card <span>·</span> Actual homework
          </div>
        </div>

        <div
          aria-label="Illustrated receipt showing zero course fee"
          className="relative flex min-h-[530px] items-center justify-center pt-[50px] before:absolute before:top-[110px] before:left-10 before:size-[360px] before:rounded-full before:bg-[#fff0b6] lg:animate-[reveal_0.85s_0.15s_both] max-md:mx-auto max-md:mt-2 max-md:min-h-[465px] max-md:w-full max-md:max-w-[390px] max-md:before:top-[115px] max-md:before:left-[35px] max-md:before:size-[290px]"
        >
          <div className="absolute top-0 left-12 -rotate-6 font-serif text-[19px] leading-[1.4] italic md:-top-5 max-md:top-[3px] max-md:left-[30px] max-md:text-[17px]">
            a revolutionary pricing model:
            <br />
            not charging you.
          </div>
          <span className="absolute top-7 right-[22px] rotate-15 font-[serif] text-[65px] max-md:top-[21px] max-md:right-[21px] max-md:text-[55px]">
            ↘
          </span>

          <div className="relative w-[295px] rotate-6 bg-[#fffef9] px-[25px] pt-[27px] pb-5 font-[monospace] leading-[1.5] shadow-[0_15px_45px_#5e462319] drop-shadow-[0_2px_2px_#1c19170c] after:absolute after:-bottom-2 after:left-0 after:h-[10px] after:w-full after:zigzag max-md:w-[260px] max-md:rotate-5 max-md:p-[23px]">
            <div className="flex flex-col gap-0.5 text-center">
              <span className="text-[17px] font-bold tracking-[3px]">THE INTERNET</span>
              <span className="text-[8px] tracking-[1px]">EST. BEFORE THIS COURSE</span>
            </div>
            <div className={receiptDash} />
            <div className="mb-[15px] text-[13px] font-bold">Your AI education</div>
            {receiptRows.map(([label, value]) => (
              <div key={label} className="my-[11px] flex justify-between text-[10px] max-md:text-[9px]">
                <span>{label}</span>
                <b className="font-normal">{value}</b>
              </div>
            ))}
            <div className={receiptDash} />
            <div>
              <span className="block text-[10px] tracking-[2px]">COURSE FEE</span>
              <strong className="text-[61px] leading-[1.3] tracking-[-4px] max-md:text-[54px]">
                ₹0<span className="text-[30px] tracking-[-2px]">.00</span>
              </strong>
            </div>
            <div className="mt-3 bg-marker p-2 text-center text-[11px] font-bold">
              YOU KEEP <s className="mr-3 font-normal">₹0</s> ₹10,000
            </div>
            <div className="barcode mx-auto mt-[21px] h-[30px] w-[165px]" />
            <p className="mx-0 mt-[7px] mb-0 text-center text-[7px] tracking-[0.5px] max-md:text-[6px]">
              NO REFUND NEEDED. NOTHING CHARGED.
            </p>
          </div>

          <div className="absolute -right-[5px] bottom-[35px] flex size-[103px] -rotate-14 flex-col items-center justify-center rounded-full border border-ink bg-marker font-serif text-[32px] leading-[1.1] shadow-[3px_3px_0_var(--color-ink)] max-md:right-[5px] max-md:bottom-10 max-md:size-[88px] max-md:text-[29px]">
            100%
            <br />
            <small className="mt-[5px] font-sans text-[7px] font-extrabold tracking-[0.7px] max-md:text-[6px]">
              LESS CHECKOUT
            </small>
          </div>
          <div className="absolute -bottom-2 left-[15px] -rotate-5 text-[9px] text-muted max-md:-bottom-[3px] max-md:left-[9px]">
            Optional tools may cost money.
            <br />
            We say that part out loud.
          </div>
        </div>
      </section>

      <div className="border-y border-line">
        <div className="wrap flex items-center justify-between gap-5 py-[23px] max-md:flex-wrap max-md:justify-center max-md:gap-x-[25px] max-md:gap-y-[17px]">
          <span className="text-[8px] font-extrabold leading-[1.6] tracking-[1.2px] text-muted max-md:w-full max-md:text-center">
            SAME TOOLS.
            <br className="max-md:hidden" /> NO COURSE TOLL.
          </span>
          {tools.map(([logo, name]) => (
            <span key={name} className="flex items-center gap-2 text-[16px] font-bold whitespace-nowrap max-xl:text-[13px]">
              <BrandLogo logo={logos[logo]} size={22} />
              {name}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
