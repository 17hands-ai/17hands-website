# scrollcraft engine

`scrollcraft.js` is the scroll-craft skill's runtime, copied verbatim (skill v0.3.1,
github.com/nateherkai/scroll-craft @ 75d81f74, MIT). Do not edit it per project: theme it
from `index.css` and drive bespoke behaviour from page code.

Only the device rules this site uses are ported to `index.css` (the "scroll-craft devices"
block). The engine's own stylesheet resets `html`, `body` and media elements, which would fight
Tailwind, so it is not loaded.

Mounted by `useScrollCraft` (src/hooks/use-scrollcraft.ts). The engine touches `matchMedia`
at load, so it is imported dynamically on the client and never runs during prerender.
