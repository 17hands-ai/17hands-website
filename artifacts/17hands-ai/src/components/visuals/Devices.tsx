import type { ReactNode } from "react";

/**
 * Plain device frames for real screenshots. The phone frame is 390:812 so that, after its 3.5%
 * padding, the screen inside is exactly 390:844 and a capture fills it without cropping. The
 * browser screen is 16:10, matching the 1440x900 desktop captures.
 */
export function PhoneFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    // Positioned either way, so the notch has a containing block; callers may pass `absolute`.
    <div className={`device-phone ${/\babsolute\b/.test(className) ? "" : "relative"} aspect-[390/812] rounded-[2.4rem] p-[3.5%] ${className}`}>
      <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-black">{children}</div>
      <span aria-hidden="true" className="absolute left-1/2 top-[2.6%] h-[2.4%] w-[26%] -translate-x-1/2 rounded-full bg-black" />
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
