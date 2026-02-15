import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import controlPanelCss from './style.css?raw';

const HOST_ID = 'no-noise-linkedin-root';

function mountApp() {
  console.log('No Noise LinkedIn: mountApp called');
  let host = document.getElementById(HOST_ID) as HTMLElement | null;

  if (!host) {
    host = document.createElement('div');
    host.id = HOST_ID;
    // Optional: small hint to other scripts
    host.setAttribute('data-nnl-host', '1');
    document.body.append(host);
  }

  const shadow = (host.shadowRoot as ShadowRoot) || host.attachShadow({ mode: 'open' });
  const styleEl = document.createElement('style');
  styleEl.textContent = controlPanelCss;
  shadow.append(styleEl);
  const root = createRoot(shadow);

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}

console.log('No Noise LinkedIn: Content script (src/index.tsx) loaded');
mountApp();
