import React from 'react';
import type { Preview } from '@storybook/react-vite';
import { CssBaseline, ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material';
import '../src/style.css';

if (!globalThis.chrome) {
  const storageArea = {
    get(defaults: Record<string, unknown>, callback: (items: Record<string, unknown>) => void) {
      callback(defaults);
    },
    set(_partial: Record<string, unknown>, callback: () => void) {
      callback();
    }
  };

  (globalThis as unknown as { chrome: typeof chrome }).chrome = {
    runtime: {
      getURL: (path: string) => path,
      reload: () => undefined,
      id: 'storybook-mock-runtime-id',
      connect: (() => undefined) as unknown as typeof chrome.runtime.connect,
      onConnect: { addListener: () => undefined, removeListener: () => undefined, hasListener: () => false } as unknown as typeof chrome.runtime.onConnect,
      onMessage: { addListener: () => undefined, removeListener: () => undefined, hasListener: () => false } as unknown as typeof chrome.runtime.onMessage,
      onMessageExternal: { addListener: () => undefined, removeListener: () => undefined, hasListener: () => false } as unknown as typeof chrome.runtime.onMessageExternal,
      onConnectExternal: { addListener: () => undefined, removeListener: () => undefined, hasListener: () => false } as unknown as typeof chrome.runtime.onConnectExternal,
      sendMessage: (() => Promise.resolve(undefined)) as unknown as typeof chrome.runtime.sendMessage
    },
    storage: {
      sync: storageArea,
      local: storageArea,
      onChanged: {
        addListener: () => undefined,
        removeListener: () => undefined,
        hasListener: () => false,
        hasListeners: () => false
      }
    }
  } as unknown as typeof chrome;
}

if (!navigator.clipboard) {
  Object.defineProperty(navigator, 'clipboard', {
    value: {
      writeText: async () => undefined
    },
    configurable: true
  });
}

const preview: Preview = {
  globalTypes: {
    colorMode: {
      name: 'Color Mode',
      description: 'Global color mode for Material UI theme',
      defaultValue: 'dark',
      toolbar: {
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' }
        ]
      }
    }
  },
  decorators: [
    (Story, context) => {
      const mode = context.globals.colorMode === 'light' ? 'light' : 'dark';
      const theme = responsiveFontSizes(
        createTheme({
          palette: { mode },
          shape: { borderRadius: 10 }
        })
      );

      return React.createElement(
        ThemeProvider,
        { theme },
        React.createElement(CssBaseline),
        React.createElement(
          'div',
          {
            style: { minHeight: '100vh', width: '100%', padding: 16, display: 'flex', justifyContent: 'center', alignItems: 'flex-start' },
            'data-theme': mode === 'dark' ? 'DARK' : 'LIGHT'
          },
          React.createElement('div', { style: { width: 'min(100%, 420px)' } }, React.createElement(Story))
        )
      );
    }
  ],
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'responsive'
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    a11y: {
      test: 'todo'
    }
  }
};

export default preview;