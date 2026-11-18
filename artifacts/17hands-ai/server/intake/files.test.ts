import { describe, expect, it } from "vitest";
import { MAX_FILE_BYTES } from "../../src/lib/intake/schema.js";
import { checkUpload, sniff } from "./files.js";
import { checkSvg } from "./svg.js";
import { JPEG, PNG, SVG, bytes } from "./fixtures.js";

const WEBP = bytes("RIFF", [0x24, 0, 0, 0], "WEBP", "VP8 ");
const text = (value: string) => new TextEncoder().encode(value);

describe("sniff", () => {
  it("identifies each allowed type from its bytes", () => {
    expect(sniff(JPEG)).toBe("jpg");
    expect(sniff(PNG)).toBe("png");
    expect(sniff(WEBP)).toBe("webp");
    expect(sniff(text(SVG))).toBe("svg");
    expect(sniff(text("<svg xmlns='http://www.w3.org/2000/svg'/>"))).toBe("svg");
  });

  it("returns null for anything else", () => {
    expect(sniff(bytes("GIF89a", [1, 0, 1, 0]))).toBeNull();
    expect(sniff(bytes("%PDF-1.7"))).toBeNull();
    expect(sniff(bytes("MZ", [0x90, 0]))).toBeNull();
    expect(sniff(text("<html><script>alert(1)</script></html>"))).toBeNull();
    expect(sniff(bytes("RIFF", [0, 0, 0, 0], "WAVE"))).toBeNull();
    expect(sniff(new Uint8Array())).toBeNull();
  });
});

describe("checkUpload", () => {
  it("accepts a file whose bytes match its slot and stated type", () => {
    expect(checkUpload(JPEG, "headshot", "jpg")).toEqual({ ok: true });
    expect(checkUpload(text(SVG), "logo", "svg")).toEqual({ ok: true });
  });

  it("rejects a file renamed to look like an image", () => {
    expect(checkUpload(text("<html><script>alert(1)</script></html>"), "headshot", "jpg").ok).toBe(false);
    expect(checkUpload(bytes("MZ", [0x90, 0]), "logo", "png").ok).toBe(false);
  });

  it("rejects bytes that are a different allowed type than stated", () => {
    expect(checkUpload(PNG, "headshot", "jpg").ok).toBe(false);
  });

  it("rejects an SVG headshot even when it is a clean SVG", () => {
    expect(checkUpload(text(SVG), "headshot", "svg").ok).toBe(false);
  });

  it("rejects empty and oversized files whatever the browser claimed", () => {
    expect(checkUpload(new Uint8Array(), "headshot", "jpg").ok).toBe(false);
    const big = new Uint8Array(MAX_FILE_BYTES + 1);
    big.set(JPEG);
    expect(checkUpload(big, "headshot", "jpg").ok).toBe(false);
  });

  it("rejects an SVG logo that carries a script", () => {
    const result = checkUpload(text(`<svg xmlns="http://www.w3.org/2000/svg"><script>alert(1)</script></svg>`), "logo", "svg");
    expect(result.ok).toBe(false);
  });
});

describe("checkSvg", () => {
  const wrap = (inner: string, attrs = "") => `<svg xmlns="http://www.w3.org/2000/svg" ${attrs}>${inner}</svg>`;

  it("accepts plain artwork", () => {
    expect(checkSvg(SVG)).toEqual({ ok: true });
  });

  it.each([
    ["script element", wrap("<script>alert(1)</script>")],
    ["event handler", wrap(`<rect onclick="alert(1)" width="1" height="1"/>`)],
    ["onload on the root", wrap("", `onload="alert(1)"`)],
    ["foreignObject", wrap("<foreignObject><body xmlns='http://www.w3.org/1999/xhtml'/></foreignObject>")],
    ["javascript link", wrap(`<a href="javascript:alert(1)"><rect/></a>`)],
    ["obfuscated javascript href", wrap(`<use href="java&#9;script:alert(1)"/>`)],
    ["external use", wrap(`<use href="https://evil.example/x.svg#a"/>`)],
    ["external image", wrap(`<image href="https://evil.example/pixel.png"/>`)],
    ["animation that rewrites href", wrap(`<set attributeName="href" to="javascript:alert(1)"/>`)],
    ["external url in a style attribute", wrap(`<rect style="fill:url(https://evil.example/x)"/>`)],
    ["external url in a stylesheet", wrap(`<style>rect{background:url("//evil.example/x")}</style>`)],
    ["stylesheet import", wrap(`<style>@import "https://evil.example/x.css";</style>`)],
    ["escaped stylesheet import", wrap(`<style>@\\69mport "https://evil.example/x.css";</style>`)],
    ["stylesheet import inside CDATA", wrap(`<style><![CDATA[@import url(https://evil.example/x.css);]]></style>`)],
    ["doctype with an entity", `<!DOCTYPE svg [<!ENTITY x "boom">]>${wrap("<text>&x;</text>")}`],
    ["processing instruction", `<?xml-stylesheet href="https://evil.example/x.css"?>${wrap("")}`],
    ["non-svg root", `<html xmlns="http://www.w3.org/1999/xhtml"><script>alert(1)</script></html>`],
    ["malformed markup", `<svg xmlns="http://www.w3.org/2000/svg"><g></svg>`],
    ["empty document", ""],
  ])("rejects %s", (_name, source) => {
    expect(checkSvg(source).ok).toBe(false);
  });
});
