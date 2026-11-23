"use client";

import { useSyncExternalStore } from "react";

/**
 * Tiny localStorage-backed stores. useSyncExternalStore keeps the server render and
 * first client render identical (nothing saved), then every component reading a key
 * stays in sync, including across tabs. Falls back to memory when storage is blocked.
 */
const listeners = new Map<string, Set<() => void>>();
const memory = new Map<string, string | null>();

export function readLocal(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return memory.get(key) ?? null;
  }
}

export function writeLocal(key: string, value: string | null) {
  memory.set(key, value);
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  } catch {}
  listeners.get(key)?.forEach((l) => l());
}

function subscribeTo(key: string) {
  return (cb: () => void) => {
    let set = listeners.get(key);
    if (!set) listeners.set(key, (set = new Set()));
    set.add(cb);
    const onStorage = (e: StorageEvent) => {
      if (e.key === key) cb();
    };
    window.addEventListener("storage", onStorage);
    return () => {
      set.delete(cb);
      window.removeEventListener("storage", onStorage);
    };
  };
}

const subscribers = new Map<string, ReturnType<typeof subscribeTo>>();

export function useLocalValue(key: string): string | null {
  let subscribe = subscribers.get(key);
  if (!subscribe) subscribers.set(key, (subscribe = subscribeTo(key)));
  return useSyncExternalStore(
    subscribe,
    () => readLocal(key),
    () => null,
  );
}
