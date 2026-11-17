/**
 * SVG is XML that browsers execute: it can carry scripts, event handlers and external loads.
 * Uploaded logos are checked against an allowlist and rejected outright when anything falls
 * outside it. Nothing is rewritten, so there is no "cleaned" output that could still be unsafe;
 * a rejected client is asked for a PNG instead.
 */
import { SaxesParser } from "saxes";

const ELEMENTS = new Set(
  [
    "svg", "g", "defs", "symbol", "use", "title", "desc", "style",
    "path", "rect", "circle", "ellipse", "line", "polyline", "polygon",
    "text", "tspan", "textPath",
    "linearGradient", "radialGradient", "stop", "pattern", "clipPath", "mask",
    "filter", "feGaussianBlur", "feOffset", "feMerge", "feMergeNode", "feBlend",
    "feColorMatrix", "feFlood", "feComposite", "feDropShadow",
  ],
);

/** Prefixed attributes that carry no behaviour. Every other prefix is refused. */
const PREFIXED_ATTRIBUTES = new Set(["xlink:href", "xml:space", "xml:lang"]);

export type SvgCheck = { ok: true } | { ok: false; reason: string };

/** CSS may point at things inside the file (url(#id)) and nowhere else, and may not hide text behind escapes. */
function cssProblem(css: string): string | null {
  const flat = css.toLowerCase();
  if (flat.includes("\\")) return "escaped characters in styles";
  if (flat.includes("@import")) return "an imported stylesheet";
  if (/expression\s*\(|javascript\s*:|-moz-binding|behavior\s*:/.test(flat)) return "script in styles";
  for (const match of flat.matchAll(/url\s*\(\s*(['"]?)\s*([^)]*)/g)) {
    if (!match[2].startsWith("#")) return "a link to an outside file in styles";
  }
  return null;
}

function attributeProblem(name: string, value: string): string | null {
  const lower = name.toLowerCase();
  if (lower.startsWith("on")) return `an event handler (${name})`;
  if (lower === "xmlns" || lower.startsWith("xmlns:")) return null;
  if (lower.includes(":") && !PREFIXED_ATTRIBUTES.has(lower)) return `an unsupported attribute (${name})`;
  if (lower === "href" || lower === "xlink:href") {
    return value.trim().startsWith("#") ? null : "a link to something outside the file";
  }
  // Whitespace and control characters are stripped the way a browser does before reading a scheme.
  if (/(?:java|vb)script:|data:/i.test(value.replace(/[\u0000- ]/g, ""))) return "an embedded script or data link";
  return cssProblem(value);
}

export function checkSvg(source: string): SvgCheck {
  let problem: string | null = null;
  let depth = 0;
  let sawRoot = false;
  let styleText: string | null = null;
  const fail = (reason: string) => {
    problem ??= reason;
  };

  const parser = new SaxesParser();
  parser.on("error", () => fail("markup that is not well-formed"));
  parser.on("doctype", () => fail("a DOCTYPE declaration"));
  parser.on("processinginstruction", () => fail("a processing instruction"));
  parser.on("opentag", (tag) => {
    if (depth === 0) {
      if (sawRoot || tag.name !== "svg") fail("a root element that is not <svg>");
      sawRoot = true;
    }
    depth += 1;
    if (!ELEMENTS.has(tag.name)) return fail(`an unsupported element (<${tag.name}>)`);
    if (tag.name === "style") styleText = "";
    for (const [name, value] of Object.entries(tag.attributes as Record<string, string>)) {
      const found = attributeProblem(name, value);
      if (found) fail(found);
    }
  });
  const collect = (text: string) => {
    if (styleText !== null) styleText += text;
  };
  parser.on("text", collect);
  parser.on("cdata", collect);
  parser.on("closetag", (tag) => {
    depth -= 1;
    if (tag.name === "style" && styleText !== null) {
      const found = cssProblem(styleText);
      if (found) fail(found);
      styleText = null;
    }
  });

  try {
    parser.write(source).close();
  } catch {
    fail("markup that is not well-formed");
  }
  if (!problem && !sawRoot) problem = "no <svg> element";
  return problem ? { ok: false, reason: problem } : { ok: true };
}
