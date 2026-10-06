import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import fs from "fs";
import type { Plugin } from "vite";
import { pages, notFoundTitle, SITE_ORIGIN, type PageMeta } from "./src/lib/pages";

const port = Number(process.env.PORT) || 3000;

const escapeAttr = (v: string) => v.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

/** Rewrite the head of the built index.html for one route. */
function headFor(html: string, page: Pick<PageMeta, "title" | "description" | "noindex"> & { url?: string }) {
  let out = html
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeAttr(page.title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*/, `$1${escapeAttr(page.description)}`);
  if (page.url) {
    out = out
      .replace(/(<link rel="canonical" href=")[^"]*/, `$1${page.url}`)
      .replace(/(<meta property="og:url" content=")[^"]*/, `$1${page.url}`);
  } else {
    out = out.replace(/\s*<link rel="canonical"[^>]*>/, "");
  }
  if (page.noindex) out = out.replace(/(<meta name="robots" content=")[^"]*/, "$1noindex, follow");
  return out;
}

/**
 * The site is a client-routed SPA on static hosting with no rewrite rules, so
 * any path without a file behind it 404s on direct visit or refresh. Emit a
 * real entry file per route (plus 404.html and the sitemap) so every route
 * resolves, each with its own title and canonical.
 */
function staticRoutes(): Plugin {
  let outDir = "";
  return {
    name: "static-routes",
    apply: "build",
    configResolved(config) {
      outDir = config.build.outDir;
    },
    closeBundle() {
      const indexHtml = fs.readFileSync(path.join(outDir, "index.html"), "utf8");
      for (const page of pages) {
        const html = headFor(indexHtml, { ...page, url: SITE_ORIGIN + (page.canonical ?? page.path) });
        const file = page.path === "/" ? "index.html" : path.join(page.path.slice(1), "index.html");
        fs.mkdirSync(path.dirname(path.join(outDir, file)), { recursive: true });
        fs.writeFileSync(path.join(outDir, file), html);
      }
      fs.writeFileSync(
        path.join(outDir, "404.html"),
        headFor(indexHtml, { title: notFoundTitle, description: "This page doesn't exist.", noindex: true }),
      );
      const urls = pages
        .filter((p) => !p.noindex)
        .map((p) => `  <url><loc>${SITE_ORIGIN}${p.path}</loc></url>`)
        .join("\n");
      fs.writeFileSync(
        path.join(outDir, "sitemap.xml"),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      );
    },
  };
}

export default defineConfig({
  base: process.env.BASE_PATH || "/",
  plugins: [react(), tailwindcss(), staticRoutes()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
