import { ArrowUpRight, BookOpen, Play, Sparkles } from "lucide-react";
import { Eyebrow, textLink } from "./ui";

const steps = [
  { n: "01", title: "Learn", text: "Watch one useful tutorial. Not seventeen tabs and an identity crisis.", Icon: BookOpen },
  { n: "02", title: "Practice", text: "Pause the video. Try the task. Watching is not the same as doing.", Icon: Play },
  { n: "03", title: "Build", text: "A prompt kit. A workflow. A website. Something beyond a bookmark.", Icon: Sparkles },
  { n: "04", title: "Keep up", text: "Follow changes that help your work. There is no attendance register.", Icon: ArrowUpRight },
];

export function Why() {
  return (
    <section
      id="why"
      className="wrap section-y grid grid-cols-[1.5fr_1fr] items-center gap-[100px] max-xl:gap-[50px] max-md:grid-cols-1 max-md:gap-[35px]"
    >
      <div className="[&_p]:text-[14px] [&_p]:leading-[1.85]">
        <Eyebrow>A NOTE FROM THE DEPARTMENT OF KEEPING YOUR MONEY</Eyebrow>
        <h2 className="text-[42px] max-md:text-[34px] max-md:tracking-[-1.2px]">
          AI changes every day.
          <br />
          Your budget <em>doesn&apos;t have to.</em>
        </h2>
        <p>
          “300+ new AI models in the last 12 months.”
          <br />
          Great. You still need to finish that spreadsheet.
        </p>
        <p className="text-muted">
          You don&apos;t need a personal relationship with every new model. You need one tool, one real problem, and
          an uninterrupted afternoon.
        </p>
        <p className="text-muted">
          Paid teaching can be worth it for feedback, accountability, and support. But before you buy a syllabus, try
          the free route. AI changing quickly is a reason to check the docs—not panic-buy a course.
        </p>
        <a className={textLink} href="#resources">
          Meet your free learning sources <ArrowUpRight size={16} />
        </a>
      </div>

      <div className="relative rotate-2 rounded-[2px] bg-[#fff3b0] px-[38px] py-[34px] shadow-[4px_6px_0_#ede3c6] max-md:w-full max-md:max-w-[400px] max-md:p-[27px]">
        <Eyebrow size="text-[8px] mb-2.5">A MORE USEFUL NUMBER</Eyebrow>
        <strong className="block font-serif text-[110px] leading-[1.1] font-medium max-md:text-[88px]">
          {/* Fraunces has no arrow glyph; skip next/font's metric-adjusted fallback so the arrow
              falls back to plain serif, as in the original */}
          1<span className="ml-[50px] font-[Fraunces,serif] text-[60px]">→</span>
        </strong>
        <h3 className="font-serif text-[29px]">useful workflow</h3>
        <p className="mt-[7px] mb-[23px] text-[14px] leading-[1.85]">beats 300 model announcements.</p>
        <div className="mb-5 h-px bg-[#c8b768]" />
        <small className="text-[12px]">
          Less launch anxiety.
          <br />
          More things you can actually do.
        </small>
      </div>
    </section>
  );
}

export function Formula() {
  return (
    <section className="section-y bg-ink text-paper">
      <div className="wrap">
        <Eyebrow className="text-marker">HOW IT WORKS</Eyebrow>
        <h2 className="text-[38px] max-md:text-[33px]">The suspiciously simple formula.</h2>
        <div className="mt-[38px] grid grid-cols-4 max-md:grid-cols-2 max-md:gap-y-[30px]">
          {steps.map(({ n, title, text, Icon }) => (
            <div
              key={n}
              className="border-r border-[#ffffff26] px-[27px] first:pl-0 last:border-r-0 last:pr-0 max-md:px-5 max-md:odd:pl-0 max-md:nth-2:border-r-0 max-md:nth-2:pr-0 max-md:last:pr-0"
            >
              <div className="mb-[25px] flex items-center justify-between text-marker max-md:mb-[17px]">
                <span className="text-[10px] tracking-[2px]">{n}</span>
                <Icon className="w-[21px]" />
              </div>
              <h3 className="font-serif text-[27px] font-medium">{title}</h3>
              <p className="mb-0 text-[12px] leading-[1.8] text-[#d0c9be]">{text}</p>
            </div>
          ))}
        </div>
        <div className="mt-9 flex justify-between gap-[25px] border-t border-[#ffffff26] pt-6 text-[10px] text-[#d0c9be] max-md:flex-wrap max-md:gap-[14px] max-md:text-[9px]">
          <span>5 learning themes</span>
          <span>At your own pace</span>
          <span>Creator credit, always</span>
          <strong className="text-marker">₹0 course fee</strong>
        </div>
      </div>
    </section>
  );
}
