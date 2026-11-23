import { ImageResponse } from "next/og";
import { totalLessons } from "@/lib/course";
import { Marker, OgBrand, OgFrame, colors, ogFonts, ogSize } from "@/lib/og";

export const alt = "Zero to ₹0: learn AI from free lessons and keep your ₹10,000.";
export const size = ogSize;
export const contentType = "image/png";

const rows: [string, string][] = [
  ["Public tutorials", "₹0"],
  ["Useful learning path", "₹0"],
  ["Hands-on projects", "₹0"],
];

export default async function Image() {
  return new ImageResponse(
    (
      <OgFrame>
        <OgBrand />
        <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column", width: 640 }}>
            <div style={{ display: "flex", fontSize: 18, fontWeight: 800, letterSpacing: 2.4 }}>
              THE FREE AI COURSE
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                marginTop: 22,
                fontFamily: "Fraunces",
                fontSize: 76,
                lineHeight: 1.04,
                letterSpacing: -3,
              }}
            >
              <span>Learn AI.&nbsp;</span>
              <span>Keep your</span>
              <Marker>
                <span style={{ fontStyle: "italic" }}>₹10,000.</span>
              </Marker>
            </div>
            <div style={{ display: "flex", marginTop: 26, fontSize: 24, color: colors.muted, lineHeight: 1.45 }}>
              {totalLessons} free lessons from the people who make the tools, in order. No account, no fee.
            </div>
          </div>

          {/* The receipt */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: 330,
              padding: "30px 28px 26px",
              background: colors.receipt,
              fontFamily: "Public Sans",
              fontSize: 18,
              transform: "rotate(5deg)",
              boxShadow: "0 18px 50px rgba(94,70,35,0.16)",
              border: `1px solid ${colors.line}`,
            }}
          >
            <div style={{ display: "flex", justifyContent: "center", fontWeight: 700, letterSpacing: 2 }}>RECEIPT</div>
            <div style={{ display: "flex", margin: "18px 0", borderTop: "2px dashed #b9b0a5" }} />
            {rows.map(([label, value]) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span>{label}</span>
                <span>{value}</span>
              </div>
            ))}
            <div style={{ display: "flex", margin: "12px 0 18px", borderTop: "2px dashed #b9b0a5" }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span style={{ fontWeight: 700 }}>TOTAL</span>
              <span style={{ fontFamily: "Fraunces", fontSize: 52, letterSpacing: -2 }}>₹0.00</span>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 6, fontWeight: 700, fontSize: 15 }}>
              YOU KEEP ₹10,000
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, color: colors.muted }}>
          <span style={{ fontWeight: 700, color: colors.ink }}>zeroto.infinitylinkage.com</span>
          <span>Free and open source</span>
        </div>
      </OgFrame>
    ),
    { ...size, fonts: await ogFonts() },
  );
}
