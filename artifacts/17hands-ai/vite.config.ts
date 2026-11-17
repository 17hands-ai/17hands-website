import { createServer, defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import fs from "fs";
import { createHash } from "crypto";
import type { Plugin } from "vite";
import { pages, notFoundTitle, SITE_ORIGIN, SITE_SUMMARY, type PageMeta } from "./src/lib/pages";
import { UMAMI_WEBSITE_ID } from "./src/lib/site";

const port = Number(process.env.PORT) || 3000;

const escapeAttr = (v: string) => v.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

/** Rewrite the head of the built index.html for one route. */
function headFor(
  html: string,
  page: Pick<PageMeta, "title" | "description" | "noindex"> & {
    url?: string;
    /** BCP 47 tag for <html lang>, and the og:locale that goes with it. */
    lang?: string;
    ogLocale?: string;
    /** hreflang -> absolute URL, for routes that exist in several languages. */
    alternates?: Record<string, string>;
    jsonLd?: object[];
  },
) {
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
  // Share cards carried the home page's title on every route; give each route its own.
  if (page.url) {
    out = out
      .replace(/(<meta (?:property="og|name="twitter):title" content=")[^"]*/g, `$1${escapeAttr(page.title)}`)
      .replace(/(<meta (?:property="og|name="twitter):description" content=")[^"]*/g, `$1${escapeAttr(page.description)}`);
  }
  if (page.lang) out = out.replace(/<html lang="[^"]*"/, `<html lang="${page.lang}"`);
  const extra = [
    page.ogLocale ? `<meta property="og:locale" content="${page.ogLocale}" />` : "",
    ...Object.entries(page.alternates ?? {}).map(([lang, href]) => `<link rel="alternate" hreflang="${lang}" href="${href}" />`),
    // "<" is escaped so copy can never close the script element.
    ...(page.jsonLd ?? []).map((data) => `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`),
  ].filter(Boolean);
  if (extra.length) out = out.replace("</head>", `  ${extra.join("\n    ")}\n  </head>`);
  return out;
}

const ANALYTICS_TAG = UMAMI_WEBSITE_ID
  ? `<script defer src="https://cloud.umami.is/script.js" data-website-id="${UMAMI_WEBSITE_ID}"></script>`
  : "";

/**
 * HTML sources write the canonical host as %SITE_ORIGIN% and the analytics slot as <!-- %ANALYTICS% -->,
 * so both are set in one place (pages.ts, site.ts).
 */
const fillPlaceholders = (html: string) =>
  html.replaceAll("%SITE_ORIGIN%", SITE_ORIGIN).replaceAll("<!-- %ANALYTICS% -->", ANALYTICS_TAG);

/**
 * Content-Security-Policy for routes marked `strictCsp` in pages.ts, written into the route's
 * HTML as a <meta> tag. Inline scripts are admitted by hash, computed here from the final HTML,
 * so editing one in index.html can never leave a stale allowance behind. (frame-ancestors is
 * not honoured in a <meta> policy; vercel.json sends it as a header.)
 */
function contentSecurityPolicy(html: string) {
  const inline = [...html.matchAll(/<script(?![^>]*\bsrc=)(?![^>]*application\/ld\+json)[^>]*>([\s\S]*?)<\/script>/g)];
  const hashes = inline.map(([, body]) => `'sha256-${createHash("sha256").update(body).digest("base64")}'`);
  const analytics = UMAMI_WEBSITE_ID ? " https://cloud.umami.is" : "";
  const policy = [
    "default-src 'self'",
    `script-src 'self' ${hashes.join(" ")} https://challenges.cloudflare.com${analytics}`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: blob:",
    // Uploads go from the browser straight to Supabase Storage.
    `connect-src 'self' https://*.supabase.co${analytics}${analytics && " https://api-gateway.umami.dev"}`,
    "frame-src https://challenges.cloudflare.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join("; ");
  const charset = '<meta charset="UTF-8" />';
  if (!html.includes(charset)) throw new Error("static-routes: charset meta not found, cannot place the CSP");
  // First in <head>, so it governs every script that follows.
  return html.replace(charset, `${charset}\n    <meta http-equiv="Content-Security-Policy" content="${policy}" />`);
}

/**
 * Serves /api/bio-intake/* from the Vite dev server with the same handlers Vercel runs
 * (api/bio-intake/*.ts), so the form works under `pnpm dev`. Services without keys in .env fall
 * back to stand-ins; see devDeps in server/intake/config.ts.
 */
function intakeDevApi(): Plugin {
  return {
    name: "intake-dev-api",
    apply: "serve",
    configureServer(server) {
      const env = { ...process.env, ...loadEnv(server.config.mode, server.config.root, "") };
      type Memory = import("./server/intake/memory-store").MemoryStore;
      let memory: Memory | undefined;
      let announced = false;
      const MAX_UPLOAD = 5 * 1024 * 1024;

      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url ?? "/", `http://${req.headers.host}`);
        if (!url.pathname.startsWith("/api/bio-intake/")) return next();
        const send = (status: number, body: string, type = "application/json") => {
          res.statusCode = status;
          res.setHeader("content-type", type);
          res.end(body);
        };
        try {
          const config = (await server.ssrLoadModule("/server/intake/config.ts")) as typeof import("./server/intake/config");
          const handlers = (await server.ssrLoadModule("/server/intake/handlers.ts")) as typeof import("./server/intake/handlers");
          const { MemoryStore } = (await server.ssrLoadModule("/server/intake/memory-store.ts")) as typeof import("./server/intake/memory-store");
          memory ??= new MemoryStore((p) => `/api/bio-intake/dev-upload?path=${encodeURIComponent(p)}`);
          if (!announced) {
            announced = true;
            console.log("[bio-intake dev]", config.devServices(env));
          }

          const chunks: Buffer[] = [];
          let size = 0;
          for await (const chunk of req) {
            size += chunk.length;
            if (size > MAX_UPLOAD + 1024) return send(413, "{}");
            chunks.push(chunk as Buffer);
          }
          const body = Buffer.concat(chunks);

          // Stand-in for the Supabase signed upload URL, only reachable with memory storage.
          if (url.pathname === "/api/bio-intake/dev-upload" && req.method === "PUT") {
            memory.files.set(url.searchParams.get("path") ?? "", new Uint8Array(body));
            return send(200, "{}");
          }
          const handler = { "/api/bio-intake/start": handlers.handleStart, "/api/bio-intake/submit": handlers.handleSubmit }[url.pathname];
          if (!handler) return send(404, "{}");

          const headers = new Headers();
          for (const [name, value] of Object.entries(req.headers)) if (typeof value === "string") headers.set(name, value);
          const request = new Request(url, { method: req.method, headers, body: req.method === "POST" ? body : undefined });
          const response = await handlers.guarded(handler, () => config.devDeps(env, [url.origin], memory!))(request);
          if (url.pathname.endsWith("/submit") && response.ok && memory.submissions.length) {
            const { id, full_name, headshot_path, logo_path } = memory.submissions[memory.submissions.length - 1];
            console.log("[bio-intake dev] stored in memory:", { id, full_name, headshot_path, logo_path });
          }
          response.headers.forEach((value, name) => res.setHeader(name, value));
          res.statusCode = response.status;
          res.end(await response.text());
        } catch (error) {
          server.ssrFixStacktrace(error as Error);
          console.error(error);
          send(500, JSON.stringify({ ok: false, message: "Dev API error. See the terminal." }));
        }
      });
    },
  };
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
  const mod = (await server.ssrLoadModule("/src/entry-server.tsx")) as typeof import("./src/entry-server");
  return Object.assign((route: string) => mod.render(route), { close: () => server.close(), mod });
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
    transformIndexHtml: { order: "pre", handler: fillPlaceholders },
    async closeBundle() {
      const indexHtml = fs.readFileSync(path.join(outDir, "index.html"), "utf8");
      const render = await loadRenderer();
      const { LOCALES, TRANSLATED_PATHS, localizedPath, contents, structuredData, llmsSections } = render.mod;
      const withBody = (html: string, route: string, locale: string) => {
        const body = render(route);
        if (!html.includes(EMPTY_ROOT)) throw new Error("static-routes: empty #root not found in index.html");
        // data-locale tells main.tsx which language this HTML was rendered in.
        return html.replace(EMPTY_ROOT, `<div id="root" data-locale="${locale}">${body}</div>`);
      };
      /** Every language version of a translated route, for hreflang and the sitemap. */
      const alternatesFor = (routePath: string) => ({
        ...Object.fromEntries(LOCALES.map((l) => [l, SITE_ORIGIN + localizedPath(l, routePath)])),
        "x-default": SITE_ORIGIN + routePath,
      });
      const sitemapUrls: string[] = [];
      try {
        for (const locale of LOCALES) {
          const content = contents[locale];
          for (const page of pages) {
            // Standalone documents and redirect stubs exist once, in English.
            if (locale !== "en" && (page.standalone || page.noindex)) continue;
            const translated = TRANSLATED_PATHS.includes(page.path);
            const route = localizedPath(locale, page.path);
            const file = path.join(route.slice(1), "index.html");
            const sourceHtml = page.standalone
              ? fillPlaceholders(fs.readFileSync(path.join(outDir, file), "utf8"))
              : indexHtml;
            // Untranslated routes under /ru and /es show English copy, so they point at the English URL.
            const url = SITE_ORIGIN + (translated ? route : page.canonical ?? page.path);
            const meta = translated ? content.meta[page.path] : page;
            let html = headFor(sourceHtml, {
              ...page,
              ...meta,
              url,
              lang: page.standalone ? undefined : content.htmlLang,
              ogLocale: page.standalone ? undefined : content.ogLocale,
              alternates: translated ? alternatesFor(page.path) : undefined,
              jsonLd: translated ? structuredData(page.path, locale, content, SITE_ORIGIN) : undefined,
            });
            if (!page.noindex && !page.standalone) html = withBody(html, route, locale);
            if (page.strictCsp) html = contentSecurityPolicy(html);
            if (/%(SITE_ORIGIN|ANALYTICS)%/.test(html)) throw new Error(`static-routes: unreplaced placeholder in ${file}`);
            fs.mkdirSync(path.dirname(path.join(outDir, file)), { recursive: true });
            fs.writeFileSync(path.join(outDir, file), html);

            if (page.noindex || (locale !== "en" && !translated)) continue;
            const links = translated
              ? Object.entries(alternatesFor(page.path))
                  .map(([lang, href]) => `<xhtml:link rel="alternate" hreflang="${lang}" href="${href}"/>`)
                  .join("")
              : "";
            sitemapUrls.push(`  <url><loc>${url}</loc>${links}</url>`);
          }
        }
        fs.writeFileSync(
          path.join(outDir, "404.html"),
          withBody(
            headFor(indexHtml, { title: notFoundTitle, description: "This page doesn't exist.", noindex: true }),
            "/__not-found",
            "en",
          ),
        );
      } finally {
        await render.close();
      }
      fs.writeFileSync(
        path.join(outDir, "sitemap.xml"),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${sitemapUrls.join("\n")}\n</urlset>\n`,
      );
      fs.writeFileSync(path.join(outDir, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_ORIGIN}/sitemap.xml\n`);

      // llms.txt (llmstxt.org): plain-text summary plus an index of indexed pages, so AI assistants
      // get the gist without running JavaScript. Built from the same list as the sitemap.
      const indexed = pages.filter((p) => !p.noindex);
      const missing = indexed.filter((p) => !p.answers).map((p) => p.path);
      if (missing.length) throw new Error(`static-routes: pages.ts entries need \`answers\` for llms.txt: ${missing.join(", ")}`);
      const pageLines = indexed.map((p) => `- [${p.title.replace(/ \| 17hands\.ai$/, "")}](${SITE_ORIGIN}${p.path}): ${p.answers}`).join("\n");
      const languages = `The home, packages, FAQ and contact pages are also published in Russian (${SITE_ORIGIN}/ru) and Spanish (${SITE_ORIGIN}/es).`;
      fs.writeFileSync(
        path.join(outDir, "llms.txt"),
        `# 17hands.ai\n\n> ${SITE_SUMMARY}\n\n${languages}\n\n## Pages\n\n${pageLines}\n\n${llmsSections(contents.en)}`,
      );
    },
  };
}

export default defineConfig({
  base: process.env.BASE_PATH || "/",
  plugins: [react(), tailwindcss(), staticRoutes(), intakeDevApi()],
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
