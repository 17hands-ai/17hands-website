import { renderToString } from "react-dom/server";
import App from "./App";

/**
 * Render one route to HTML at build time. Called by the staticRoutes plugin in
 * vite.config.ts so crawlers that don't run JavaScript still get the page content.
 */
export function render(path: string): string {
  return renderToString(<App ssrPath={path} />);
}
