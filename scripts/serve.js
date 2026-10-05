import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Serves `dist/` the way the host does: exact file, then <path>/index.html, then the SPA
 * fallback — in that order.
 *
 * `vite preview` cannot be used to check a prerendered build. It is an SPA server, so it answers
 * every unknown path with the root `index.html` — which means a case study URL serves the *home*
 * page's markup and then client-routes over it. That looks fine to a human and is wrong for a
 * crawler, and it is precisely what this build exists to avoid, so it needs a server that
 * resolves files first.
 */
const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist');
const PORT = Number(process.env.PORT) || 4173;

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.xml': 'application/xml', '.txt': 'text/plain',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif',
  '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.webp': 'image/webp',
  '.mp4': 'video/mp4', '.pdf': 'application/pdf', '.woff2': 'font/woff2',
};

http
  .createServer((req, res) => {
    const url = decodeURIComponent(req.url.split('?')[0]);
    for (const file of [
      path.join(dist, url),
      path.join(dist, url, 'index.html'),
      path.join(dist, `${url}.html`),
      path.join(dist, 'index.html'),
    ]) {
      if (!file.startsWith(dist)) continue; // no climbing out of dist
      if (fs.existsSync(file) && fs.statSync(file).isFile()) {
        res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] ?? 'application/octet-stream' });
        res.end(fs.readFileSync(file));
        return;
      }
    }
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
  })
  .listen(PORT, () => console.log(`dist/ served like production → http://localhost:${PORT}`));
