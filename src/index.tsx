import React from 'react';
import { createRoot } from 'react-dom/client';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import App from './App';
import controlPanelCss from './style.css?raw';

const HOST_ID = 'no-noise-linkedin-root';

function mountApp() {
  console.log('No Noise LinkedIn: mountApp called');
  let host = document.getElementById(HOST_ID) as HTMLElement | null;

  if (!host) {
    host = document.createElement('div');
    host.id = HOST_ID;
    host.setAttribute('data-nnl-host', '1');
    document.body.append(host);
  }

  const shadow = (host.shadowRoot as ShadowRoot) || host.attachShadow({ mode: 'open' });

  // Inject our own CSS into the shadow root (only once)
  if (!shadow.querySelector('style[data-nnl]')) {
    const styleEl = document.createElement('style');
    styleEl.setAttribute('data-nnl', '1');
    styleEl.textContent = controlPanelCss;
    shadow.append(styleEl);
  }

  // Mount React into a child container so the shadow root itself is not the React root
  let container = shadow.querySelector<HTMLDivElement>('div[data-nnl-mount]');
  if (!container) {
    container = document.createElement('div');
    container.setAttribute('data-nnl-mount', '1');
    shadow.append(container);
  }

  // Configure emotion to inject MUI/emotion styles into the shadow root,
  // not into document.head — this gives full CSS isolation from the host page.
  const emotionCache = createCache({
    key: 'nnl',
    container: shadow as unknown as HTMLElement,
    prepend: true,
  });

  const root = createRoot(container);

  root.render(
    <React.StrictMode>
      <CacheProvider value={emotionCache}>
        <App />
      </CacheProvider>
    </React.StrictMode>,
  );
}

console.log('No Noise LinkedIn: Content script (src/index.tsx) loaded');
mountApp();
