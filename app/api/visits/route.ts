import { Redis } from "@upstash/redis";

/**
 * Public visit counter. One POST per browser session (the client remembers it in
 * sessionStorage), no cookies and nothing personal stored: just a single number.
 * The Redis database is shared with another project, so this site's count lives
 * under its own key.
 */
const KEY = "zero-to-0:visits";

function getRedis() {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  return url && token ? new Redis({ url, token }) : null;
}

export async function POST(request: Request) {
  // Only count requests made by this site's own pages.
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== new URL(request.url).host) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  const redis = getRedis();
  if (!redis) return Response.json({ count: null }, { status: 503 });

  // Only the live site adds visits. Local dev and preview deployments read the total but never change it.
  const isLiveSite = process.env.VERCEL_ENV === "production";

  let count = false;
  try {
    const body = (await request.json()) as { count?: unknown };
    count = isLiveSite && body.count === true;
  } catch {}

  try {
    const total = count ? await redis.incr(KEY) : Number((await redis.get<number>(KEY)) ?? 0);
    return Response.json({ count: total }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ count: null }, { status: 502 });
  }
}
