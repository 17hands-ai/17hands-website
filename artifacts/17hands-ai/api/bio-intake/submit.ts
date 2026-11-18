import { productionDeps } from "../../server/intake/config.js";
import { guarded, handleSubmit } from "../../server/intake/handlers.js";

/** POST /api/bio-intake/submit. See server/intake/handlers.ts. */
export const POST = guarded(handleSubmit, productionDeps);
