import path from "node:path";
import fs from "node:fs";
import { defineConfig, type Plugin, type Connect } from "vite";
import react from "@vitejs/plugin-react";

/**
 * Serves the existing static CROSSWAVE pages (../about.html, ../css, ../img …)
 * alongside the React app in `vite` dev and `vite preview`, so links from the
 * new header and hero to the current pages work locally.
 * "/" is the React hero; "/index.html" is the existing static homepage.
 */
function staticSite(): Plugin {
  const siteRoot = path.resolve(__dirname, "..");
  const allowed = /^\/(?:[\w-]+\.html|(?:css|js|img|lib|services)\/[\w./-]+)$/;
  const types: Record<string, string> = {
    ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".png": "image/png",
    ".jpg": "image/jpeg", ".ico": "image/x-icon", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".woff": "font/woff",
  };
  const middleware: Connect.NextHandleFunction = (req, res, next) => {
    const url = (req.url ?? "").split(/[?#]/)[0];
    if (!allowed.test(url) || url.includes("..")) return next();
    const file = path.join(siteRoot, url);
    if (!fs.existsSync(file) || !fs.statSync(file).isFile()) return next();
    res.setHeader("Content-Type", types[path.extname(file)] ?? "application/octet-stream");
    fs.createReadStream(file).pipe(res);
  };
  return {
    name: "crosswave-static-site",
    configureServer: (server) => void server.middlewares.use(middleware),
    configurePreviewServer: (server) => void server.middlewares.use(middleware),
  };
}

export default defineConfig({
  plugins: [react(), staticSite()],
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
});
