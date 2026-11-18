import { purgeDeps } from "../../server/intake/config.js";
import { guardedPurge } from "../../server/intake/purge.js";

/** GET /api/bio-intake/purge. Called daily by Vercel Cron. See server/intake/purge.ts. */
export const GET = guardedPurge(purgeDeps);
