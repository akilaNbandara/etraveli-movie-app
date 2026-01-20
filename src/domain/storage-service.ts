import type { StorageService } from './StorageService';

export const storageService: StorageService = {
  getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    if (item) {
      return JSON.parse(item) as T;
    }
    return null;
  },
  setItem<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  },
};
