import { useCallback, useEffect, useState } from 'react';
import { DEFAULTS, Settings, StorageArea } from './constants';

async function getAll(area: StorageArea, defaults: Settings): Promise<Settings> {
  return new Promise((resolve) => {
    chrome.storage[area].get(defaults as unknown as Record<string, unknown>, (items) => {
      resolve({ ...defaults, ...(items as Settings) });
    });
  });
}

async function setPartial(area: StorageArea, partial: Partial<Settings>): Promise<void> {
  return new Promise((resolve) => {
    chrome.storage[area].set(partial as Record<string, unknown>, () => resolve());
  });
}

export function useSettings() {
  const area: StorageArea = 'sync';
  const defaults: Settings = DEFAULTS;

  useEffect(() => {

    const onChanged = (changes: { [key: string]: chrome.storage.StorageChange }, areaName: chrome.storage.AreaName) => {
      if (areaName !== area) return;

      const updated: Partial<Settings> = {};
      for (const key of Object.keys(changes)) {
        if (key in defaults) {
          const change = changes[key];
          if (change && 'newValue' in change) {
            (updated as any)[key] = (change as any).newValue;
          }
        }
      }
    };

    chrome.storage.onChanged.addListener(onChanged);
    return () => {
      chrome.storage.onChanged.removeListener(onChanged);
    };
  }, [area, defaults]);

  const save = useCallback(async (partial: Partial<Settings>) => {
    await setPartial(area, partial);
  }, [area]);

  const setSetting = useCallback(async (key: keyof Settings, value: boolean) => {
    await setPartial(area, { [key]: value });
  }, [area]);

  return { setSetting, area, getAll };
}