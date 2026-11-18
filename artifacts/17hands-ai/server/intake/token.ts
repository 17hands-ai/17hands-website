/**
 * The upload token ties step 2 (submit) to step 1 (spam check passed, upload URLs issued).
 * It is an HMAC-signed statement of which storage paths this visitor was given, so a caller
 * cannot submit without passing Turnstile or point a submission at someone else's files.
 */
import { createHmac, timingSafeEqual } from "node:crypto";

export interface UploadGrant {
  /** Submission id, decided at step 1 so the files and the row share it. */
  id: string;
  headshot: string;
  logo: string | null;
  /** Expiry, epoch milliseconds. */
  exp: number;
}

const mac = (secret: string, data: string) => createHmac("sha256", secret).update(data).digest("base64url");

export function signGrant(secret: string, grant: UploadGrant): string {
  const body = Buffer.from(JSON.stringify(grant)).toString("base64url");
  return `${body}.${mac(secret, body)}`;
}

export function verifyGrant(secret: string, token: string, now: number): UploadGrant | null {
  const [body, signature, extra] = token.split(".");
  if (!body || !signature || extra !== undefined) return null;
  const expected = Buffer.from(mac(secret, body));
  const given = Buffer.from(signature);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null;
  try {
    const grant = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as UploadGrant;
    if (typeof grant.id !== "string" || typeof grant.headshot !== "string" || typeof grant.exp !== "number") return null;
    return grant.exp > now ? grant : null;
  } catch {
    return null;
  }
}

/** Rate limiting needs to recognise an address again, not to know it, so only a keyed hash is stored. */
export const hashIp = (secret: string, ip: string) => createHmac("sha256", secret).update(`ip:${ip}`).digest("hex");
