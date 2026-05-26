export function BrandDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 py-2 ${className}`}>
      <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/60" />
      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
      <div className="h-px w-8 bg-primary/40" />
      <div className="w-1 h-1 rounded-full bg-primary/60" />
      <div className="h-px w-8 bg-primary/40" />
      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
      <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/60" />
    </div>
  );
}

export function CircuitAccent({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-48 h-6 opacity-40 ${className}`}
    >
      <line x1="0" y1="12" x2="60" y2="12" stroke="#D4AF37" strokeWidth="0.8" />
      <circle cx="60" cy="12" r="2" fill="#D4AF37" />
      <line x1="62" y1="12" x2="72" y2="4" stroke="#D4AF37" strokeWidth="0.8" />
      <line x1="72" y1="4" x2="90" y2="4" stroke="#D4AF37" strokeWidth="0.8" />
      <circle cx="90" cy="4" r="1.5" fill="#D4AF37" />
      <line x1="62" y1="12" x2="72" y2="20" stroke="#D4AF37" strokeWidth="0.8" />
      <line x1="72" y1="20" x2="90" y2="20" stroke="#D4AF37" strokeWidth="0.8" />
      <circle cx="90" cy="20" r="1.5" fill="#D4AF37" />
      <line x1="100" y1="12" x2="140" y2="12" stroke="#D4AF37" strokeWidth="0.8" />
      <circle cx="100" cy="12" r="2" fill="#D4AF37" />
      <line x1="140" y1="12" x2="150" y2="4" stroke="#D4AF37" strokeWidth="0.8" />
      <line x1="150" y1="4" x2="200" y2="4" stroke="#D4AF37" strokeWidth="0.8" />
      <line x1="140" y1="12" x2="150" y2="20" stroke="#D4AF37" strokeWidth="0.8" />
      <line x1="150" y1="20" x2="200" y2="20" stroke="#D4AF37" strokeWidth="0.8" />
      <circle cx="200" cy="4" r="1.5" fill="#D4AF37" />
      <circle cx="200" cy="20" r="1.5" fill="#D4AF37" />
    </svg>
  );
}

export function GoldWaveSVG({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full opacity-30 ${className}`}
      preserveAspectRatio="none"
    >
      <path
        d="M0 60 C150 20, 300 100, 450 60 S750 20, 900 60 S1050 100, 1200 60"
        stroke="#D4AF37"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M0 75 C150 35, 300 115, 450 75 S750 35, 900 75 S1050 115, 1200 75"
        stroke="#D4AF37"
        strokeWidth="0.8"
        fill="none"
        opacity="0.5"
      />
      <circle cx="150" cy="36" r="2.5" fill="#D4AF37" opacity="0.8" />
      <circle cx="450" cy="60" r="2" fill="#D4AF37" opacity="0.7" />
      <circle cx="750" cy="36" r="2.5" fill="#D4AF37" opacity="0.8" />
      <circle cx="1050" cy="84" r="2" fill="#D4AF37" opacity="0.7" />
    </svg>
  );
}
