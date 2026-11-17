import { productionDeps } from "../../server/intake/config.js";
import { guarded, handleStart } from "../../server/intake/handlers.js";

/** POST /api/bio-intake/start. See server/intake/handlers.ts. */
export const POST = guarded(handleStart, productionDeps);
