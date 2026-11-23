"use client";

import { useEffect, useState } from "react";

const SESSION_FLAG = "zero-to-0-visit-counted";

/**
 * One request per page load, shared by every counter on the page (and safe under
 * React's double-run of effects in development). A visit is added once per browser
 * session; later page views in the same session only read the total.
 */
let request: Promise<number | null> | null = null;

function loadCount(): Promise<number | null> {
  if (request) return request;

  let counted = false;
  try {
    counted = sessionStorage.getItem(SESSION_FLAG) === "1";
  } catch {}

  request = fetch("/api/visits", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ count: !counted }),
  })
    .then((r) => (r.ok ? (r.json() as Promise<{ count: number | null }>) : null))
    .then((data) => {
      if (typeof data?.count !== "number") return null;
      try {
        sessionStorage.setItem(SESSION_FLAG, "1");
      } catch {}
      return data.count;
    })
    .catch(() => null);

  return request;
}

export function VisitCounter({ className }: { className?: string }) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let active = true;
    loadCount().then((n) => {
      if (active) setCount(n);
    });
    return () => {
      active = false;
    };
  }, []);

  // Nothing renders until the number arrives, so a failed request never shows "0 visits".
  if (count === null) return null;
  return (
    <span className={className}>
      {count.toLocaleString("en-IN")} {count === 1 ? "visit" : "visits"}
    </span>
  );
}
