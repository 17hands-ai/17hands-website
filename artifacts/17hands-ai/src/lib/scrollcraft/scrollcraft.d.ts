// Types for the vendored scroll-craft engine (scrollcraft.js, copied verbatim from the
// scroll-craft skill, v0.3.1). The engine is an IIFE that assigns window.ScrollCraft.
export {};

export interface ScrollCraftInstance {
  destroy(): void;
}

declare global {
  interface Window {
    ScrollCraft?: {
      mount(root: Element | string, opts?: Record<string, unknown>): ScrollCraftInstance;
      reduce: boolean;
      instances: ScrollCraftInstance[];
    };
  }
}
