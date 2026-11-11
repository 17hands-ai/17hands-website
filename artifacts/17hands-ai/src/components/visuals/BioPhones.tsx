/** Side-by-side sketch: a list of links next to a bio page built to be contacted from. Decorative; the copy beside it says the same thing. */
function Phone({ x, children, label, note }: { x: number; children: React.ReactNode; label: string; note: string }) {
  return (
    <g transform={`translate(${x} 0)`}>
      <rect x="0" y="0" width="150" height="270" rx="22" fill="var(--brand-surface)" />
      <rect x="56" y="10" width="38" height="5" rx="2.5" fill="rgb(255 255 255 / 0.14)" />
      {children}
      <text x="75" y="296" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--brand-text)">{label}</text>
      <text x="75" y="314" textAnchor="middle" fontSize="11" fill="var(--brand-text-2)">{note}</text>
    </g>
  );
}

export function BioPhones({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="-18 0 376 322" aria-hidden="true" focusable="false" className={className} fontFamily="var(--app-font-sans)">
      <Phone x={0} label="A list of links" note="Sends people elsewhere">
        <circle cx="75" cy="52" r="16" fill="rgb(255 255 255 / 0.12)" />
        {[88, 120, 152, 184, 216].map((y) => (
          <rect key={y} x="18" y={y} width="114" height="22" rx="11" fill="rgb(255 255 255 / 0.1)" />
        ))}
      </Phone>
      <Phone x={190} label="Your bio page" note="Gives them a way to reach you">
        <circle cx="75" cy="52" r="16" fill="var(--brand-rose)" />
        <rect x="45" y="78" width="60" height="6" rx="3" fill="rgb(255 255 255 / 0.5)" />
        <rect x="18" y="98" width="114" height="26" rx="8" fill="var(--brand-amethyst)" className="flow-check" />
        <text x="75" y="115" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#fff">Save contact</text>
        {["Call", "Text", "Book"].map((t, i) => (
          <g key={t}>
            <rect x={18 + i * 40} y="132" width="34" height="24" rx="7" fill="var(--brand-secondary)" />
            <text x={35 + i * 40} y="148" textAnchor="middle" fontSize="9.5" fill="var(--brand-text)">{t}</text>
          </g>
        ))}
        <rect x="18" y="168" width="114" height="18" rx="5" fill="rgb(255 255 255 / 0.08)" />
        <rect x="18" y="192" width="114" height="30" rx="5" fill="rgb(255 255 255 / 0.08)" />
        <rect x="18" y="230" width="114" height="22" rx="7" fill="none" stroke="var(--brand-rose)" strokeWidth="1.2" />
        <text x="75" y="245" textAnchor="middle" fontSize="10" fill="var(--brand-rose)">Send inquiry</text>
      </Phone>
    </svg>
  );
}
