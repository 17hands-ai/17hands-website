import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import { loadContent, localeOf } from "./i18n";
import "./index.css";

const root = document.getElementById("root")!;
const locale = localeOf(window.location.pathname);

// The locale's copy must be in hand before hydrating, or the first render would not match
// the pre-rendered HTML. English is in the main bundle; /ru and /es fetch one extra chunk.
loadContent(locale).then((content) => {
  const app = <App locale={locale} content={content} />;
  // Routes pre-rendered at build time ship their HTML; attach to it instead of
  // re-rendering. Redirect stubs ship an empty root and render from scratch.
  // 404.html is rendered in English, so an unknown /ru or /es URL renders fresh instead.
  if (root.hasChildNodes() && root.dataset.locale === locale) hydrateRoot(root, app);
  else {
    root.replaceChildren();
    createRoot(root).render(app);
  }
});
