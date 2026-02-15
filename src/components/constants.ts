export type Settings = {
  disablePromoted: boolean;
  disableSuggested: boolean;
  disableNews: boolean;
  disableFeed: boolean;
  theme: 'LIGHT' | 'DARK';
};

export const DEFAULTS: Settings = {
  disablePromoted: true,
  disableSuggested: true,
  disableNews: true,
  disableFeed: false,
  theme: 'DARK',
};

export type StorageArea = 'sync' | 'local';
