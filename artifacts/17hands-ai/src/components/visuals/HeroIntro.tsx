import { useEffect, useRef } from "react";

/**
 * The logo film, played once per session inside the hero's visual slot and then cross-faded
 * to the diagram underneath. The inline script in index.html decides before first paint
 * whether it runs (`html.intro-on`); without that class this renders nothing visible and
 * requests nothing. The rest of the page stays visible and usable throughout.
 */
export function HeroIntro() {
  const box = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const el = box.current;
    const v = video.current;
    if (!el || !v || !root.classList.contains("intro-on")) return;

    let done = false;
    const timers: number[] = [];
    const later = (fn: () => void, ms: number) => timers.push(window.setTimeout(fn, ms));

    const finish = () => {
      if (done) return;
      done = true;
      try { sessionStorage.setItem("intro-seen", "1"); } catch { /* private mode */ }
      root.classList.add("intro-reveal");
      later(() => {
        root.classList.remove("intro-on", "intro-reveal");
        v.pause();
      }, 1000);
    };

    let started = false;
    const onPlaying = () => { started = true; };
    const onEnded = () => later(finish, 300);
    v.addEventListener("playing", onPlaying);
    v.addEventListener("ended", onEnded);
    v.addEventListener("error", finish);

    // Start only once the hero visual is on screen (on a phone it sits below the headline).
    const io = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      io.disconnect();
      v.preload = "auto";
      v.play().catch(() => later(finish, 900));
      // Autoplay blocked or a slow network: show the poster briefly, then the diagram.
      later(() => { if (!started) finish(); }, 3500);
    }, { threshold: 0.4 });
    io.observe(el);

    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
      v.removeEventListener("playing", onPlaying);
      v.removeEventListener("ended", onEnded);
      v.removeEventListener("error", finish);
    };
  }, []);

  return (
    <div ref={box} className="hero-intro" aria-hidden="true">
      <video ref={video} muted playsInline preload="none" disablePictureInPicture tabIndex={-1} width={720} height={720}>
        <source src="/intro/17hands-intro.webm" type="video/webm" />
        <source src="/intro/17hands-intro.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
