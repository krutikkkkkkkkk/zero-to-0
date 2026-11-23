"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

/**
 * Finished lessons, stored in this browser by lesson ID (IDs are permanent, so
 * reordering or adding lessons never scrambles anyone's progress).
 * useSyncExternalStore keeps server and first client render identical (nothing done)
 * and keeps every component reading the store in sync.
 */
const KEY = "free-ai-course-done";
const listeners = new Set<() => void>();
let memory = "[]"; // used when storage is blocked (private mode, etc.)

function read(): string {
  try {
    return localStorage.getItem(KEY) ?? memory;
  } catch {
    return memory;
  }
}

function write(ids: string[]) {
  memory = JSON.stringify(ids);
  try {
    localStorage.setItem(KEY, memory);
  } catch {}
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

export function useCourseProgress(validIds: ReadonlySet<string>) {
  const raw = useSyncExternalStore(subscribe, read, () => "[]");

  const done = useMemo(() => {
    try {
      const v: unknown = JSON.parse(raw);
      return new Set(Array.isArray(v) ? v.filter((id): id is string => typeof id === "string" && validIds.has(id)) : []);
    } catch {
      return new Set<string>();
    }
  }, [raw, validIds]);

  const toggle = useCallback(
    (id: string) => {
      const next = new Set(done);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      write([...next]);
    },
    [done],
  );

  const clear = useCallback(() => write([]), []);

  return { done, toggle, clear };
}
