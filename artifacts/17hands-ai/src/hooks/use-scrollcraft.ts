import { useEffect, type RefObject } from "react";
import type { ScrollCraftInstance } from "@/lib/scrollcraft/scrollcraft";

/**
 * Mounts the scroll-craft engine on `ref` after hydration and tears it down on unmount or when
 * `key` changes (locale switch re-renders the page text the engine has already measured).
 *
 * `sc-live` is added only once the engine is running, so the hidden pre-reveal states in
 * index.css never apply to prerendered HTML, to crawlers, or when the script fails to load.
 */
export function useScrollCraft(ref: RefObject<HTMLElement | null>, key?: unknown) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    let instance: ScrollCraftInstance | undefined;
    let dead = false;
    import("@/lib/scrollcraft/scrollcraft.js").then(() => {
      if (dead || !window.ScrollCraft) return;
      instance = window.ScrollCraft.mount(root);
      root.classList.add("sc-live");
    });
    return () => {
      dead = true;
      instance?.destroy();
      root.classList.remove("sc-live");
    };
  }, [ref, key]);
}
