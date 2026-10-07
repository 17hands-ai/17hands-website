import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const root = document.getElementById("root")!;

// Routes pre-rendered at build time ship their HTML; attach to it instead of
// re-rendering. Redirect stubs ship an empty root and render from scratch.
if (root.hasChildNodes()) hydrateRoot(root, <App />);
else createRoot(root).render(<App />);
