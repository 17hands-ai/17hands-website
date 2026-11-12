import { useContent } from "@/i18n";

/**
 * Hero diagram: requests come in, get sorted and checked by a person, leave as finished work,
 * while customer records sit behind role-based access. Inline SVG animated with CSS only
 * (see "Visuals" in index.css), so it costs no JavaScript and no network request beyond the
 * logo the header has already loaded.
 */
const rowY = [52, 122, 192];
const inPaths = ["M118 52H136L155 101", "M118 122H150", "M118 192H136L155 143"];
const outPaths = ["M245 101L264 52H282", "M250 122H282", "M245 143L264 192H282"];
const downPath = "M200 172V236";

export function HeroFlow({ className = "" }: { className?: string }) {
  const t = useContent().home.flow;
  return (
    <svg viewBox="0 0 400 372" role="img" aria-label={t.aria} className={className} fontFamily="var(--app-font-sans)">
      <g fontFamily="var(--app-font-mono)" fontSize="10" letterSpacing="1.4" fill="var(--brand-rose)">
        <text x="0" y="14">{t.comesIn}</text>
        <text x="400" y="14" textAnchor="end">{t.getsDone}</text>
      </g>

      {/* Traces, then the travelling pulse drawn over each one */}
      <g fill="none" stroke="var(--brand-rose)" strokeOpacity="0.35" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
        {[...inPaths, ...outPaths, downPath].map((d) => <path key={d} d={d} />)}
      </g>
      <g fill="none" stroke="var(--brand-rose)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {inPaths.map((d, i) => (
          <path key={d} d={d} pathLength={100} className="flow-pulse" style={{ animationDelay: `${i * 0.5}s` }} />
        ))}
        {outPaths.map((d, i) => (
          <path key={d} d={d} pathLength={100} className="flow-pulse" style={{ animationDelay: `${1.6 + i * 0.5}s` }} />
        ))}
        <path d={downPath} pathLength={100} className="flow-pulse" style={{ animationDelay: "1.1s" }} />
      </g>

      {t.inputs.map((label, i) => (
        <g key={label}>
          <rect x="0" y={rowY[i] - 20} width="118" height="40" rx="8" fill="var(--brand-surface)" />
          <text x="10" y={rowY[i] + 4} fontSize="11.5" fill="var(--brand-text-2)">{label}</text>
        </g>
      ))}

      {t.outputs.map((label, i) => (
        <g key={label}>
          <rect x="282" y={rowY[i] - 20} width="118" height="40" rx="8" fill="var(--brand-secondary)" />
          <path
            d={`M292 ${rowY[i]}l4 4 7-8`}
            fill="none"
            stroke="var(--brand-rose)"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="flow-check"
            style={{ animationDelay: `${2.2 + i * 0.5}s` }}
          />
          <text x="309" y={rowY[i] + 4} fontSize="11.5" fill="var(--brand-text)">{label}</text>
        </g>
      ))}

      {/* Hub: the 17hands mark on its own dark plate in both themes, so the rose gold always reads */}
      <circle cx="200" cy="122" r="57" fill="none" stroke="var(--brand-rose)" strokeOpacity="0.6" strokeWidth="1" strokeDasharray="2 7" className="flow-ring" />
      <circle cx="200" cy="122" r="50" fill="#13091E" stroke="var(--brand-rose)" strokeOpacity="0.7" strokeWidth="1.25" className="flow-hub" />
      <image href="/logo-rosegold.png" x="166" y="84" width="68" height="46" className="flow-logo" />
      <text x="200" y="145" textAnchor="middle" fontSize={t.humanCheck.length > 13 ? 5.8 : 6.8} fontWeight="600" letterSpacing="0.6" fill="#E0A786">{t.humanCheck}</text>

      {/* Protected records */}
      <rect x="30" y="236" width="340" height="132" rx="12" fill="var(--brand-primary)" stroke="var(--brand-rose)" strokeOpacity="0.45" />
      <g transform="translate(48 254)" fill="none" stroke="var(--brand-rose)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="9" width="18" height="13" rx="2.5" />
        <path d="M5 9V6a5 5 0 0 1 10 0v3" />
      </g>
      <text x="80" y="265" fontSize="13.5" fontWeight="600" fill="var(--brand-text)">{t.records}</text>
      <text x="80" y="280" fontSize="10.5" fill="var(--brand-text-2)">{t.recordsNote}</text>
      {t.access.map((row, i) => {
        const y = 306 + i * 21;
        const off = i === t.access.length - 1;
        return (
          <g key={row.who} fontSize="12">
            <circle cx="54" cy={y - 4} r="3.5" fill={off ? "none" : "var(--brand-rose)"} stroke="var(--brand-rose)" strokeWidth="1.2" />
            <text x="68" y={y} fill="var(--brand-text)">{row.who}</text>
            <text x="352" y={y} textAnchor="end" fill={off ? "var(--brand-rose)" : "var(--brand-text-2)"}>{row.what}</text>
          </g>
        );
      })}
    </svg>
  );
}
