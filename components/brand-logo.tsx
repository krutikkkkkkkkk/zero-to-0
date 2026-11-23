/* eslint-disable @next/next/no-img-element -- tiny static icons; next/image adds nothing here */
import {
  type SimpleIcon,
  siAnthropic,
  siClaude,
  siFigma,
  siFramer,
  siFreecodecamp,
  siGithub,
  siGithubsponsors,
  siGoogle,
  siGooglegemini,
  siHuggingface,
  siMdnwebdocs,
  siN8n,
  siShadcnui,
  siStackoverflow,
  siX,
  siYoutube,
} from "simple-icons";
import { cx } from "./ui";

/**
 * Publisher logos. Most come from Simple Icons (CC0). Brands that aren't in that set
 * use the icon each company serves on its own site, saved in /public/logos.
 * Logos are trademarks of their owners and are used only to identify the publisher.
 */
type Logo = { kind: "icon"; icon: SimpleIcon } | { kind: "image"; src: string; title: string };

const icon = (i: SimpleIcon): Logo => ({ kind: "icon", icon: i });
const image = (src: string, title: string): Logo => ({ kind: "image", src, title });

export const logos = {
  openai: image("/logos/openai.svg", "OpenAI"),
  anthropic: icon(siAnthropic),
  claude: icon(siClaude),
  google: icon(siGoogle),
  gemini: icon(siGooglegemini),
  wisprflow: image("/logos/wisprflow.png", "Wispr Flow"),
  n8n: icon(siN8n),
  youtube: icon(siYoutube),
  threeBlueOneBrown: image("/logos/3blue1brown.svg", "3Blue1Brown"),
  mdn: icon(siMdnwebdocs),
  github: icon(siGithub),
  freecodecamp: icon(siFreecodecamp),
  huggingface: icon(siHuggingface),
  stackoverflow: icon(siStackoverflow),
  deeplearningai: image("/logos/deeplearningai.ico", "DeepLearning.AI"),
  figma: icon(siFigma),
  framer: icon(siFramer),
  mobbin: image("/logos/mobbin.png", "Mobbin"),
  shadcn: icon(siShadcnui),
  x: icon(siX),
  githubSponsors: icon(siGithubsponsors),
} satisfies Record<string, Logo>;

export type LogoKey = keyof typeof logos;

/** Pick the logo for a lesson's publisher label (see lib/course.ts). */
export function logoForPublisher(publisher: string): Logo | undefined {
  const p = publisher.toLowerCase();
  if (p.startsWith("openai")) return logos.openai;
  if (p.startsWith("claude academy")) return logos.claude;
  if (p.startsWith("anthropic")) return logos.anthropic;
  if (p.includes("gemini apps")) return logos.gemini;
  if (p.startsWith("google") || p.startsWith("grow with google")) return logos.google;
  if (p.startsWith("wispr")) return logos.wisprflow;
  if (p.startsWith("n8n")) return logos.n8n;
  if (p.startsWith("3blue1brown")) return logos.threeBlueOneBrown;
  if (p.endsWith("(youtube)") || p === "andrej karpathy") return logos.youtube;
  if (p.startsWith("mdn")) return logos.mdn;
  if (p.startsWith("github")) return logos.github;
  if (p.startsWith("freecodecamp")) return logos.freecodecamp;
  if (p.startsWith("hugging face")) return logos.huggingface;
  if (p.startsWith("stack overflow")) return logos.stackoverflow;
  if (p.startsWith("deeplearning.ai")) return logos.deeplearningai;
  if (p.startsWith("figma")) return logos.figma;
  if (p.startsWith("framer")) return logos.framer;
  if (p.startsWith("mobbin")) return logos.mobbin;
  if (p.startsWith("shadcn")) return logos.shadcn;
  return undefined;
}

/** Near-black brand colours follow the text colour. */
function isNearBlack(hex: string) {
  const n = parseInt(hex, 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 48;
}

export function BrandLogo({ logo, size = 16, className }: { logo: Logo; size?: number; className?: string }) {
  if (logo.kind === "image") {
    return (
      <img
        src={logo.src}
        alt=""
        width={size}
        height={size}
        className={cx("shrink-0 rounded-[3px] object-contain", className)}
        loading="lazy"
      />
    );
  }
  const { icon: i } = logo;
  return (
    <svg
      role="img"
      aria-hidden
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={isNearBlack(i.hex) ? "currentColor" : `#${i.hex}`}
      className={cx("shrink-0", className)}
    >
      <path d={i.path} />
    </svg>
  );
}
