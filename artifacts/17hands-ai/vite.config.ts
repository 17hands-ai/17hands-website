import { createServer, defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import fs from "fs";
import type { Plugin } from "vite";
import { pages, notFoundTitle, SITE_ORIGIN, SITE_SUMMARY, type PageMeta } from "./src/lib/pages";

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

const EMPTY_ROOT = '<div id="root"></div>';

/** Load src/entry-server.tsx through a throwaway Vite server so it gets the same aliases and JSX transform. */
async function loadRenderer() {
  const server = await createServer({
    configFile: path.resolve(import.meta.dirname, "vite.config.ts"),
    server: { middlewareMode: true, hmr: false },
    appType: "custom",
    logLevel: "error",
  });
  const mod = (await server.ssrLoadModule("/src/entry-server.tsx")) as { render: (path: string) => string };
  return Object.assign((route: string) => mod.render(route), { close: () => server.close() });
}

/**
 * The site is a client-routed SPA on static hosting with no rewrite rules, so
 * any path without a file behind it 404s on direct visit or refresh. Emit a
 * real entry file per route (plus 404.html and the sitemap) so every route
 * resolves, each with its own title and canonical.
 *
 * Each indexable route is also pre-rendered into #root (main.tsx hydrates it),
 * because AI crawlers like GPTBot and ClaudeBot don't run JavaScript and would
 * otherwise see an empty page. Redirect stubs keep an empty root.
 */
function staticRoutes(): Plugin {
  let outDir = "";
  return {
    name: "static-routes",
    apply: "build",
    configResolved(config) {
      outDir = config.build.outDir;
    },
    async closeBundle() {
      const indexHtml = fs.readFileSync(path.join(outDir, "index.html"), "utf8");
      const render = await loadRenderer();
      const withBody = (html: string, route: string) => {
        const body = render(route);
        if (!html.includes(EMPTY_ROOT)) throw new Error("static-routes: empty #root not found in index.html");
        return html.replace(EMPTY_ROOT, `<div id="root">${body}</div>`);
      };
      try {
        for (const page of pages) {
          let html = headFor(indexHtml, { ...page, url: SITE_ORIGIN + (page.canonical ?? page.path) });
          if (!page.noindex) html = withBody(html, page.path);
          const file = page.path === "/" ? "index.html" : path.join(page.path.slice(1), "index.html");
          fs.mkdirSync(path.dirname(path.join(outDir, file)), { recursive: true });
          fs.writeFileSync(path.join(outDir, file), html);
        }
        fs.writeFileSync(
          path.join(outDir, "404.html"),
          withBody(
            headFor(indexHtml, { title: notFoundTitle, description: "This page doesn't exist.", noindex: true }),
            "/__not-found",
          ),
        );
      } finally {
        await render.close();
      }
      const urls = pages
        .filter((p) => !p.noindex)
        .map((p) => `  <url><loc>${SITE_ORIGIN}${p.path}</loc></url>`)
        .join("\n");
      fs.writeFileSync(
        path.join(outDir, "sitemap.xml"),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      );

      // llms.txt (llmstxt.org): plain-text summary plus an index of indexed pages, so AI assistants
      // get the gist without running JavaScript. Built from the same list as the sitemap.
      const indexed = pages.filter((p) => !p.noindex);
      const missing = indexed.filter((p) => !p.answers).map((p) => p.path);
      if (missing.length) throw new Error(`static-routes: pages.ts entries need \`answers\` for llms.txt: ${missing.join(", ")}`);
      const pageLines = indexed.map((p) => `- [${p.title.replace(/ \| 17hands\.ai$/, "")}](${SITE_ORIGIN}${p.path}): ${p.answers}`).join("\n");
      fs.writeFileSync(path.join(outDir, "llms.txt"), `# 17hands.ai\n\n> ${SITE_SUMMARY}\n\n## Pages\n\n${pageLines}\n`);
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
