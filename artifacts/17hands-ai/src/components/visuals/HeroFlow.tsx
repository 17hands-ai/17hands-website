/**
 * Hero diagram: requests come in, get sorted and checked by a person, leave as finished work,
 * while customer records sit behind role-based access. Inline SVG animated with CSS only
 * (see "Visuals" in index.css), so it costs no JavaScript and no network request.
 */
const inputs = ["Website inquiry", "Email question", "Missed call"];
const outputs = ["Call booked", "Reply sent", "Follow-up set"];
const rowY = [52, 122, 192];

const inPaths = ["M118 52H140L166 104", "M118 122H162", "M118 192H140L166 140"];
const outPaths = ["M234 104L260 52H282", "M238 122H282", "M234 140L260 192H282"];

const access = [
  { who: "Owner", what: "full access", off: false },
  { who: "Staff", what: "what the job needs", off: false },
  { who: "Former staff", what: "removed", off: true },
];

export function HeroFlow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 372"
      role="img"
      aria-label="How it works: inquiries, emails and missed calls come in, are sorted and checked by a person, and leave as booked calls, replies and follow-ups. Customer records stay protected, with access set by role."
      className={className}
      fontFamily="var(--app-font-sans)"
    >
      <g fontFamily="var(--app-font-mono)" fontSize="10" letterSpacing="1.4" fill="var(--brand-rose)">
        <text x="0" y="14">COMES IN</text>
        <text x="400" y="14" textAnchor="end">GETS DONE</text>
      </g>

      {/* Traces, then the travelling pulse drawn over each one */}
      <g fill="none" stroke="var(--brand-rose)" strokeOpacity="0.35" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
        {[...inPaths, ...outPaths].map((d) => <path key={d} d={d} />)}
        <path d="M200 160V236" />
      </g>
      <g fill="none" stroke="var(--brand-rose)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {inPaths.map((d, i) => (
          <path key={d} d={d} pathLength={100} className="flow-pulse" style={{ animationDelay: `${i * 0.5}s` }} />
        ))}
        {outPaths.map((d, i) => (
          <path key={d} d={d} pathLength={100} className="flow-pulse" style={{ animationDelay: `${1.6 + i * 0.5}s` }} />
        ))}
        <path d="M200 160V236" pathLength={100} className="flow-pulse" style={{ animationDelay: "1.1s" }} />
      </g>

      {inputs.map((label, i) => (
        <g key={label}>
          <rect x="0" y={rowY[i] - 20} width="118" height="40" rx="8" fill="var(--brand-surface)" />
          <text x="12" y={rowY[i] + 4.5} fontSize="12.5" fill="var(--brand-text-2)">{label}</text>
        </g>
      ))}

      {outputs.map((label, i) => (
        <g key={label}>
          <rect x="282" y={rowY[i] - 20} width="118" height="40" rx="8" fill="var(--brand-secondary)" />
          <path
            d={`M294 ${rowY[i]}l4 4 7-8`}
            fill="none"
            stroke="var(--brand-rose)"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="flow-check"
            style={{ animationDelay: `${2.2 + i * 0.5}s` }}
          />
          <text x="312" y={rowY[i] + 4.5} fontSize="12.5" fill="var(--brand-text)">{label}</text>
        </g>
      ))}

      {/* Hub */}
      <circle cx="200" cy="122" r="38" fill="var(--brand-amethyst)" />
      <circle cx="200" cy="122" r="46" fill="none" stroke="var(--brand-rose)" strokeOpacity="0.6" strokeWidth="1" strokeDasharray="2 7" className="flow-ring" />
      <text x="200" y="121" textAnchor="middle" fontFamily="var(--app-font-serif)" fontStyle="italic" fontWeight="700" fontSize="24" fill="#fff">17</text>
      <text x="200" y="137" textAnchor="middle" fontSize="8.5" letterSpacing="0.6" fill="#fff" fillOpacity="0.85">HUMAN CHECK</text>

      {/* Protected records */}
      <rect x="30" y="236" width="340" height="132" rx="12" fill="var(--brand-primary)" stroke="var(--brand-rose)" strokeOpacity="0.45" />
      <g transform="translate(48 254)" fill="none" stroke="var(--brand-rose)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="9" width="18" height="13" rx="2.5" />
        <path d="M5 9V6a5 5 0 0 1 10 0v3" />
      </g>
      <text x="80" y="265" fontSize="13.5" fontWeight="600" fill="var(--brand-text)">Customer records</text>
      <text x="80" y="280" fontSize="10.5" fill="var(--brand-text-2)">Backed up. Access set by role.</text>
      {access.map((row, i) => {
        const y = 306 + i * 21;
        return (
          <g key={row.who} fontSize="12">
            <circle cx="54" cy={y - 4} r="3.5" fill={row.off ? "none" : "var(--brand-rose)"} stroke="var(--brand-rose)" strokeWidth="1.2" />
            <text x="68" y={y} fill="var(--brand-text)">{row.who}</text>
            <text x="352" y={y} textAnchor="end" fill={row.off ? "var(--brand-rose)" : "var(--brand-text-2)"}>{row.what}</text>
          </g>
        );
      })}
    </svg>
  );
}
