/**
 * Infrastructure Layer: Safe LocalStorage Client
 * Provides typed, SSR-safe storage operations with error boundaries and namespace isolation.
 */

const STORAGE_PREFIX = 'knot_v6_';

// Clean all legacy test keys on initialization
if (typeof window !== 'undefined') {
  try {
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith('knot_') && !k.startsWith(STORAGE_PREFIX)) {
        keysToRemove.push(k);
      }
    }
    keysToRemove.forEach((k) => {
      try {
        localStorage.removeItem(k);
      } catch {}
    });
  } catch {}
}

export const LocalStorageClient = {
  get<T>(key: string, defaultValue: T): T {
    if (typeof window === 'undefined') return defaultValue;
    try {
      const item = localStorage.getItem(STORAGE_PREFIX + key);
      if (item === null) return defaultValue;
      return JSON.parse(item) as T;
    } catch (error) {
      console.warn(`[LocalStorageClient] Failed to read key: ${key}`, error);
      return defaultValue;
    }
  },

  set<T>(key: string, value: T): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
    } catch (error) {
      console.warn(`[LocalStorageClient] Failed to write key: ${key}`, error);
    }
  },

  remove(key: string): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(STORAGE_PREFIX + key);
    } catch (error) {
      console.warn(`[LocalStorageClient] Failed to remove key: ${key}`, error);
    }
  },

  clearAll(): void {
    if (typeof window === 'undefined') return;
    try {
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith(STORAGE_PREFIX)) {
          keysToRemove.push(k);
        }
      }
      keysToRemove.forEach((k) => localStorage.removeItem(k));
    } catch (error) {
      console.warn('[LocalStorageClient] Failed to clear storage', error);
    }
  },
};
