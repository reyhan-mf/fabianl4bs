import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';

import './design/tokens.css';
import './design/bundle.css';
import './design/app.css';

const container = document.getElementById('root');

const tree = (
  <StrictMode>
    {/* Opt in to the v7 behaviours now so the upgrade is a version bump, not a migration. */}
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <App />
    </BrowserRouter>
  </StrictMode>
);

/* The build prerenders every route to real HTML (see `scripts/prerender.jsx`). Hydrating adopts
   that markup instead of throwing it away and painting the page a second time; `createRoot` is
   the fallback for `vite dev`, where the container really is empty. */
if (container.hasChildNodes()) {
  hydrateRoot(container, tree);
} else {
  createRoot(container).render(tree);
}
