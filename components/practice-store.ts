"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

/**
 * Practice progress lives in localStorage (same key as the original page), exposed
 * through useSyncExternalStore so the server render and first client render agree
 * (both start at 0/5) and the saved value appears right after hydration.
 */
const KEY = "zero-practice";
const listeners = new Set<() => void>();
let memory = "[]"; // fallback when storage is blocked

function read(): string {
  try {
    return localStorage.getItem(KEY) ?? memory;
  } catch {
    return memory;
  }
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

function parse(raw: string, total: number): number[] {
  try {
    const v: unknown = JSON.parse(raw);
    return Array.isArray(v) ? v.filter((n): n is number => typeof n === "number" && n >= 0 && n < total) : [];
  } catch {
    return [];
  }
}

export function usePractice(total: number) {
  const raw = useSyncExternalStore(subscribe, read, () => "[]");
  const completed = useMemo(() => parse(raw, total), [raw, total]);

  const toggle = useCallback(
    (i: number) => {
      const next = completed.includes(i) ? completed.filter((n) => n !== i) : [...completed, i];
      memory = JSON.stringify(next);
      try {
        localStorage.setItem(KEY, memory);
      } catch {}
      listeners.forEach((l) => l());
    },
    [completed],
  );

  return { completed, toggle };
}
