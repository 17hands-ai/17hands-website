import type { ReactNode } from "react";

/**
 * Plain device frames for real screenshots. The browser screen is 16:10, matching the 1440x900
 * desktop captures. The phone's bezel and corners are sized from the phone itself (see
 * .device-phone in index.css), never from padding, because percentage padding resolves against
 * the parent's width and would thicken the bezel and crop the screen inside a wide parent.
 */
export function PhoneFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    // Positioned either way, so the notch has a containing block; callers may pass `absolute`.
    <div className={`device-phone ${/\babsolute\b/.test(className) ? "" : "relative"} ${className}`}>
      <div className="device-screen">{children}</div>
      <span aria-hidden="true" className="device-island" />
    </div>
  );
}

export function BrowserFrame({ children, url, className = "" }: { children: ReactNode; url?: string; className?: string }) {
  return (
    <div className={`device-browser overflow-hidden rounded-xl ${className}`}>
      <div className="flex h-7 items-center gap-1.5 px-3" aria-hidden="true">
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="h-2 w-2 rounded-full bg-white/25" />
        {url && <span className="ml-3 truncate rounded-md bg-white/10 px-2 py-0.5 font-mono text-[10px] text-white/70">{url}</span>}
      </div>
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">{children}</div>
    </div>
  );
}

/** A screenshot that fills its frame from the top. */
export function Shot({ src, alt, eager = false }: { src: string; alt: string; eager?: boolean }) {
  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className="absolute inset-0 h-full w-full object-cover object-top"
    />
  );
}
