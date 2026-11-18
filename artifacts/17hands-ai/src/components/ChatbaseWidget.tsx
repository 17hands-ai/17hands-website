import { useEffect } from "react";
import { pages } from "@/lib/pages";

const CHATBASE_SCRIPT_ID = "qPpz4-PE7T8LtEXXfhuiX";

type ChatbaseFn = ((...args: unknown[]) => void) & {
  q?: unknown[][];
};

declare global {
  interface Window {
    chatbase?: ChatbaseFn;
  }
}

function initChatbaseStub() {
  const existingChatbase = window.chatbase as
    | ((method: "getState", ...args: unknown[]) => string | undefined)
    | undefined;

  if (existingChatbase?.("getState") === "initialized") {
    return;
  }

  const chatbase = ((...args: unknown[]) => {
    chatbase.q = chatbase.q ?? [];
    chatbase.q.push(args);
  }) as ChatbaseFn;

  window.chatbase = new Proxy(chatbase, {
    get(target, prop) {
      if (prop === "q") {
        return target.q;
      }

      return (...args: unknown[]) =>
        (target as unknown as (method: string | symbol, ...args: unknown[]) => void)(
          prop,
          ...args,
        );
    },
  }) as ChatbaseFn;
}

function loadChatbaseScript() {
  if (document.getElementById(CHATBASE_SCRIPT_ID)) {
    return;
  }

  const script = document.createElement("script");
  script.src = "https://www.chatbase.co/embed.min.js";
  script.id = CHATBASE_SCRIPT_ID;
  script.setAttribute("domain", "www.chatbase.co");
  document.body.appendChild(script);
}

/**
 * The intake form's document ships a Content-Security-Policy that admits no chat script, and a
 * page where clients type personal details is no place for one. The policy belongs to the
 * document, so the widget stays off until the next full page load, even after navigating away.
 */
const onStrictDocument = () => pages.some((p) => p.strictCsp && window.location.pathname.replace(/\/+$/, "").endsWith(p.path));

export function ChatbaseWidget() {
  useEffect(() => {
    if (onStrictDocument()) return;
    initChatbaseStub();

    if (document.readyState === "complete") {
      loadChatbaseScript();
      return;
    }

    window.addEventListener("load", loadChatbaseScript);
    return () => window.removeEventListener("load", loadChatbaseScript);
  }, []);

  return null;
}
