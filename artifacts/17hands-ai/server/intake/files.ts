/**
 * Upload checks. The browser's stated type and the filename prove nothing, so the type is
 * decided from the bytes themselves after the file has landed in storage.
 */
import { MAX_FILE_BYTES, SLOT_TYPES, FILE_EXTENSIONS, type FileExtension, type FileSlot } from "../../src/lib/intake/schema.js";
import { checkSvg } from "./svg.js";

const startsWith = (bytes: Uint8Array, signature: number[], offset = 0) =>
  bytes.length >= offset + signature.length && signature.every((byte, i) => bytes[offset + i] === byte);

/** Identify a file by its leading bytes. SVG has no signature, so it is recognised as text that opens like one. */
export function sniff(bytes: Uint8Array): FileExtension | null {
  if (startsWith(bytes, [0xff, 0xd8, 0xff])) return "jpg";
  if (startsWith(bytes, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) return "png";
  // RIFF....WEBP
  if (startsWith(bytes, [0x52, 0x49, 0x46, 0x46]) && startsWith(bytes, [0x57, 0x45, 0x42, 0x50], 8)) return "webp";
  const head = decodeUtf8(bytes.subarray(0, 512));
  if (head !== null && /^﻿?\s*<(?:\?xml|svg|!--)/.test(head)) return "svg";
  return null;
}

function decodeUtf8(bytes: Uint8Array): string | null {
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    // A 512-byte window can cut a multi-byte character in half; that alone is not a reason to reject.
    try {
      return new TextDecoder("utf-8", { fatal: true }).decode(bytes.subarray(0, Math.max(0, bytes.length - 3)));
    } catch {
      return null;
    }
  }
}

export type UploadCheck = { ok: true } | { ok: false; message: string };

/**
 * @param expected the extension chosen when the upload URL was issued, from the type the browser stated.
 */
export function checkUpload(bytes: Uint8Array, slot: FileSlot, expected: FileExtension): UploadCheck {
  const noun = slot === "headshot" ? "photo" : "logo";
  if (bytes.length === 0) return { ok: false, message: `The ${noun} file is empty.` };
  if (bytes.length > MAX_FILE_BYTES) return { ok: false, message: `The ${noun} is over 5 MB. Please send a smaller file.` };

  const actual = sniff(bytes);
  const allowed = SLOT_TYPES[slot].map((mime) => FILE_EXTENSIONS[mime]) as FileExtension[];
  if (!actual || !allowed.includes(actual)) {
    return {
      ok: false,
      message: slot === "logo" ? "The logo must be a JPG, PNG, WebP or SVG file." : "The photo must be a JPG, PNG or WebP file.",
    };
  }
  if (actual !== expected) {
    return { ok: false, message: `The ${noun} file does not match its file type. Please export it again and re-upload.` };
  }
  if (actual === "svg") {
    let text: string;
    try {
      text = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
    } catch {
      return { ok: false, message: "The logo SVG is not valid text. Please send a PNG instead." };
    }
    const svg = checkSvg(text);
    if (!svg.ok) {
      return { ok: false, message: `We can't accept this SVG because it contains ${svg.reason}. Please send the logo as a PNG instead.` };
    }
  }
  return { ok: true };
}
