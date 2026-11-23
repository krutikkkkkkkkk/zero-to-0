"use client";

import { useCallback, useMemo } from "react";
import { useLocalValue, writeLocal } from "./local-store";

/**
 * Finished lessons and projects, stored in this browser by permanent ID, so reordering
 * or adding lessons never scrambles anyone's progress.
 */
const KEY = "free-ai-course-done";

export function useCourseProgress(validIds: ReadonlySet<string>) {
  const raw = useLocalValue(KEY) ?? "[]";

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
      writeLocal(KEY, JSON.stringify([...next]));
    },
    [done],
  );

  /** Add items (e.g. from a progress link) without removing anything already done. */
  const add = useCallback(
    (ids: Iterable<string>) => writeLocal(KEY, JSON.stringify([...new Set([...done, ...ids])])),
    [done],
  );

  const clear = useCallback(() => writeLocal(KEY, "[]"), []);

  return { done, toggle, add, clear };
}
