import { useEffect, useRef, useState, type RefObject } from "react";

/**
 * The home page's signature move. One rose-gold trace runs down the left margin and the reader's
 * scroll draws it. Chapter headings are nodes that light as the trace reaches them. At the two
 * pillars the trace forks (one branch per pillar, each lighting its own node), the branches rejoin
 * at delivery, and the trace turns and plugs into the circuit drawn above the closing call to
 * action, which lights and holds.
 *
 * Geometry comes from markers in the page, measured on layout:
 *   data-rail-content  element whose padded left edge is where copy starts (rail sits left of it)
 *   data-rail-node     a chapter heading (first one starts the trace)
 *   data-rail-fork     top of the pillars section
 *   data-rail-branch   "0" | "1": the pillar heading on each branch
 *   data-rail-merge    top of the delivery section
 *   data-rail-end      the closing circuit; the trace ends at its left edge
 *
 * Decorative only: hidden from assistive tech, never intercepts the pointer. Reduced motion shows
 * the finished circuit, lit, with no drawing.
 */

type Seg = { x0: number; y0: number; x1: number; y1: number; len: number };
type Path = { d: string; segs: Seg[]; total: number };
type Node = { x: number; y: number; branch: 0 | 1 };
type Geometry = { width: number; height: number; main: Path; branch: Path; nodes: Node[] };

const PEN = 0.58; // the drawn tip sits this far down the viewport
const TAIL = 0.22; // viewport-heights of scroll spent drawing the final horizontal run

function build(points: [number, number][]): Path {
  const segs: Seg[] = [];
  let total = 0;
  for (let i = 1; i < points.length; i++) {
    const [x0, y0] = points[i - 1];
    const [x1, y1] = points[i];
    const len = Math.hypot(x1 - x0, y1 - y0);
    if (len < 0.5) continue;
    segs.push({ x0, y0, x1, y1, len });
    total += len;
  }
  const d = points.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  return { d, segs, total };
}

/** Length of `path` drawn when the pen is at page-y `pen`. Flat segments consume TAIL of scroll. */
function drawnAt(path: Path, pen: number, vh: number): { len: number; x: number; y: number } {
  let len = 0;
  let shift = 0; // scroll consumed by flat segments so far
  for (const s of path.segs) {
    const flat = Math.abs(s.y1 - s.y0) < 0.5;
    const y0 = s.y0 + shift;
    const span = flat ? vh * TAIL : s.y1 - s.y0;
    if (pen <= y0) return { len, x: s.x0, y: s.y0 };
    if (pen < y0 + span) {
      const t = (pen - y0) / span;
      return { len: len + s.len * t, x: s.x0 + (s.x1 - s.x0) * t, y: s.y0 + (s.y1 - s.y0) * t };
    }
    len += s.len;
    if (flat) shift += span;
  }
  const last = path.segs[path.segs.length - 1];
  return { len: path.total, x: last?.x1 ?? 0, y: last?.y1 ?? 0 };
}

function measure(root: HTMLElement): Geometry | null {
  const r = root.getBoundingClientRect();
  const at = (el: Element) => {
    const b = el.getBoundingClientRect();
    return { left: b.left - r.left, top: b.top - r.top, width: b.width, height: b.height };
  };
  const q = (sel: string) => root.querySelector(sel);
  const content = q("[data-rail-content]");
  const fork = q("[data-rail-fork]");
  const merge = q("[data-rail-merge]");
  const end = q("[data-rail-end]");
  const heads = Array.from(root.querySelectorAll("[data-rail-node]"));
  if (!content || !fork || !merge || !end || heads.length < 2) return null;

  const pad = parseFloat(getComputedStyle(content).paddingLeft) || 16;
  const copyLeft = at(content).left + pad;
  const x = Math.max(6, copyLeft - 44);
  const gap = Math.max(5, Math.min(22, copyLeft - x - 14));
  const midLine = (el: Element) => { const b = at(el); return b.top + Math.min(b.height / 2, 22); };

  const startY = midLine(heads[0]);
  const forkY = at(fork).top + 28;
  const mergeY = at(merge).top + 28;
  const e = at(end);
  const endY = e.top + e.height / 2;
  const endX = e.left;
  const chamfer = Math.min(24, Math.max(6, (endX - x) / 4));

  const main = build([[x, startY], [x, endY - chamfer], [x + chamfer, endY], [endX, endY]]);
  const branch = build([[x, forkY], [x + gap, forkY + gap], [x + gap, mergeY - gap], [x, mergeY]]);

  const nodes: Node[] = heads.map((h) => ({ x, y: midLine(h), branch: 0 as const }));
  root.querySelectorAll("[data-rail-branch]").forEach((h) => {
    const onB = h.getAttribute("data-rail-branch") === "1";
    nodes.push({ x: onB ? x + gap : x, y: midLine(h), branch: onB ? 1 : 0 });
  });
  nodes.sort((a, b) => a.y - b.y);
  return { width: r.width, height: r.height, main, branch, nodes };
}

export function CircuitRail({ rootRef }: { rootRef: RefObject<HTMLElement | null> }) {
  const [geo, setGeo] = useState<Geometry | null>(null);
  const mainRef = useRef<SVGPathElement>(null);
  const branchRef = useRef<SVGPathElement>(null);
  const sparkRef = useRef<SVGCircleElement>(null);
  const nodeRefs = useRef<(SVGCircleElement | null)[]>([]);

  // Measure on mount and whenever the page reflows (fonts, FAQ toggles, the estimator).
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let frame = 0;
    const remeasure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setGeo(measure(root)));
    };
    remeasure();
    const ro = new ResizeObserver(remeasure);
    ro.observe(root);
    window.addEventListener("resize", remeasure);
    document.fonts?.ready.then(remeasure);
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      window.removeEventListener("resize", remeasure);
    };
  }, [rootRef]);

  // Draw from scroll. Arrival latches: the close resolves and holds.
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !geo) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    root.classList.add("rail-on");
    let frame = 0;
    let arrived = false;

    const paint = () => {
      frame = 0;
      const vh = window.innerHeight;
      const rootTop = root.getBoundingClientRect().top;
      const atBottom = window.scrollY + vh >= document.documentElement.scrollHeight - 4;
      const pen = reduce || atBottom ? Infinity : vh * PEN - rootTop;

      const m = drawnAt(geo.main, pen, vh);
      const b = drawnAt(geo.branch, pen, vh);
      mainRef.current?.style.setProperty("stroke-dashoffset", String(geo.main.total - m.len));
      branchRef.current?.style.setProperty("stroke-dashoffset", String(geo.branch.total - b.len));

      const spark = sparkRef.current;
      if (spark) {
        const live = !reduce && m.len > 0 && m.len < geo.main.total;
        spark.style.opacity = live ? "1" : "0";
        if (live) spark.setAttribute("transform", `translate(${m.x.toFixed(1)} ${m.y.toFixed(1)})`);
      }

      geo.nodes.forEach((n, i) => {
        nodeRefs.current[i]?.classList.toggle("is-lit", pen >= n.y);
      });

      if (!arrived && m.len >= geo.main.total - 0.5) {
        arrived = true;
        root.classList.add("rail-arrived");
      }
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(paint); };
    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      root.classList.remove("rail-on");
    };
  }, [geo, rootRef]);

  if (!geo) return null;
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className="pointer-events-none absolute left-0 top-0 z-[5]"
      width={geo.width}
      height={geo.height}
      viewBox={`0 0 ${geo.width} ${geo.height}`}
    >
      <path className="rail-wire" d={geo.main.d} />
      <path className="rail-wire" d={geo.branch.d} />
      <path ref={mainRef} className="rail-lit" d={geo.main.d} strokeDasharray={geo.main.total} strokeDashoffset={geo.main.total} />
      <path ref={branchRef} className="rail-lit" d={geo.branch.d} strokeDasharray={geo.branch.total} strokeDashoffset={geo.branch.total} />
      {geo.nodes.map((n, i) => (
        <circle
          key={`${n.branch}-${Math.round(n.y)}`}
          ref={(el) => { nodeRefs.current[i] = el; }}
          className="rail-node"
          cx={n.x}
          cy={n.y}
          r={3.5}
        />
      ))}
      <circle ref={sparkRef} className="rail-spark" r={2.5} style={{ opacity: 0 }} />
    </svg>
  );
}
