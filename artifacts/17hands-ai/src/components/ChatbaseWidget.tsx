import { useEffect } from "react";

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

export function ChatbaseWidget() {
  useEffect(() => {
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
