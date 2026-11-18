#!/usr/bin/env node
/**
 * Checks that Vercel will be able to compile the API functions. Vercel's Node builder reuses
 * tsconfig.json with noEmit forced off and refuses to emit a file that has any error, which
 * `tsc --noEmit` does not catch (a tsconfig option that is only legal under noEmit, for one).
 * This repeats that step locally. Run from artifacts/17hands-ai: pnpm check:functions
 */
import { readdirSync } from "node:fs";
import path from "node:path";
import ts from "typescript";
const root = process.cwd();
const cfgPath = path.join(root, "tsconfig.json");
const config = ts.readConfigFile(cfgPath, ts.sys.readFile).config;
config.files = []; config.include = [];
Object.assign(config.compilerOptions, { sourceMap: true, inlineSourceMap: false, inlineSources: true, declaration: false, noEmit: false, outDir: "$$ts-node$$" });
if (config.compilerOptions.esModuleInterop === undefined) config.compilerOptions.esModuleInterop = true;
const parsed = ts.parseJsonConfigFileContent(config, ts.sys, root, undefined, cfgPath);
const fmt = (d) => ts.flattenDiagnosticMessageText(d.messageText, "\n");
parsed.errors.forEach((d) => console.log("config:", fmt(d)));
const sources = (dir) => readdirSync(path.join(root, dir)).filter((f) => f.endsWith(".ts") && !f.endsWith(".test.ts")).map((f) => path.join(root, dir, f));
const files = [...sources("api/bio-intake"), ...sources("server/intake"), path.join(root, "src/lib/intake/schema.ts")];
const host = {
  getScriptFileNames: () => files, getScriptVersion: () => "1",
  getScriptSnapshot: (f) => ts.sys.fileExists(f) ? ts.ScriptSnapshot.fromString(ts.sys.readFile(f)) : undefined,
  getCurrentDirectory: () => root, getCompilationSettings: () => parsed.options,
  getDefaultLibFileName: (o) => ts.getDefaultLibFilePath(o),
  fileExists: ts.sys.fileExists, readFile: ts.sys.readFile, readDirectory: ts.sys.readDirectory,
  directoryExists: ts.sys.directoryExists, getDirectories: ts.sys.getDirectories,
};
const service = ts.createLanguageService(host, ts.createDocumentRegistry());
let bad = 0;
for (const f of files) {
  const out = service.getEmitOutput(f);
  const diags = [...service.getCompilerOptionsDiagnostics(), ...service.getSemanticDiagnostics(f), ...service.getSyntacticDiagnostics(f)];
  diags.forEach((d) => console.log("diag:", fmt(d)));
  console.log(path.relative(root, f), out.emitSkipped ? "EMIT SKIPPED" : `emitted ${out.outputFiles.length} files`);
  if (out.emitSkipped) bad++;
}
process.exit(bad ? 1 : 0);
