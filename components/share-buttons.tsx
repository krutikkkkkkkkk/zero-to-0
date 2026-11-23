import { shareUrls } from "@/lib/share";
import { BrandLogo, logos } from "./brand-logo";
import { cx } from "./ui";

/** LinkedIn's "in" mark. Neither Simple Icons nor lucide ship it, so it's drawn here. */
function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden focusable="false">
      <rect x="1.5" y="1.5" width="21" height="21" rx="3.5" fill="#0a66c2" />
      <circle cx="7.4" cy="7.3" r="1.75" fill="#fff" />
      <rect x="5.85" y="10" width="3.1" height="8.6" fill="#fff" />
      <path
        fill="#fff"
        d="M10.9 10h2.95v1.3c.45-.85 1.5-1.55 3-1.55 2.6 0 3.3 1.7 3.3 3.95v4.9h-3.1v-4.3c0-1.1-.25-1.95-1.35-1.95-1.15 0-1.7.85-1.7 2v4.25h-3.1z"
      />
    </svg>
  );
}

const buttonCls =
  "inline-flex items-center gap-2 rounded-[8px] border border-line bg-paper px-3.5 py-2 text-[13px] font-semibold text-ink transition-colors hover:border-ink";

/** "Post on X" and "Share on LinkedIn" links. They open each site's own share screen in a new tab. */
export function ShareButtons({ url, text, className }: { url: string; text: string; className?: string }) {
  const links = shareUrls(url, text);
  return (
    <div className={cx("flex flex-wrap gap-2", className)}>
      <a href={links.x} target="_blank" rel="noopener noreferrer" className={buttonCls}>
        <BrandLogo logo={logos.x} size={14} /> Post on X
        <span className="sr-only">(opens in a new tab)</span>
      </a>
      <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className={buttonCls}>
        <LinkedInIcon size={16} /> Share on LinkedIn
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    </div>
  );
}
