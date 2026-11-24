import { useEffect, useState } from "react";

/**
 * Types a phrase, holds it, erases it and types the next. Every phrase is also rendered
 * invisibly in the same grid cell, so the line reserves the size of the longest one and the
 * page never shifts. Screen readers and crawlers get the full list once, as plain text.
 * With reduced motion the phrases swap whole, without typing.
 */
export function TypeSwap({ phrases, className = "" }: { phrases: string[]; className?: string }) {
  const [index, setIndex] = useState(0);
  const [shown, setShown] = useState(phrases[0]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timer = 0;
    let i = 0;
    let len = phrases[0].length;
    let phase: "hold" | "erase" | "type" = "hold";

    const step = () => {
      const word = phrases[i];
      if (reduce) {
        i = (i + 1) % phrases.length;
        setIndex(i);
        setShown(phrases[i]);
        timer = window.setTimeout(step, 3200);
        return;
      }
      if (phase === "hold") {
        phase = "erase";
        timer = window.setTimeout(step, 40);
      } else if (phase === "erase") {
        len -= 1;
        setShown(word.slice(0, Math.max(0, len)));
        if (len <= 0) {
          i = (i + 1) % phrases.length;
          setIndex(i);
          phase = "type";
          timer = window.setTimeout(step, 260);
        } else timer = window.setTimeout(step, 32);
      } else {
        len += 1;
        setShown(phrases[i].slice(0, len));
        if (len >= phrases[i].length) {
          phase = "hold";
          timer = window.setTimeout(step, 2200);
        } else timer = window.setTimeout(step, 62);
      }
    };
    timer = window.setTimeout(step, 2400);
    return () => window.clearTimeout(timer);
  }, [phrases]);

  return (
    <span className={`type-swap ${className}`}>
      <span className="sr-only">{phrases.join(" ")}</span>
      <span aria-hidden="true" className="grid">
        {phrases.map((p) => (
          <span key={p} className="invisible col-start-1 row-start-1">{p}</span>
        ))}
        <span className="col-start-1 row-start-1" data-index={index}>
          {shown}
          <span className="type-caret" />
        </span>
      </span>
    </span>
  );
}
