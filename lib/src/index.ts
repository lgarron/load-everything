import { readAsBlobFunction, readFileFunction } from "./node";

type ImportMetaResolveResult = string | URL | Promise<string> | Promise<URL>;

export async function dynamicImport(
  import_meta_resolve_result: ImportMetaResolveResult,
  // rome-ignore lint/suspicious/noExplicitAny: The imported code could be `any`thing.
): Promise<any> {
  const awaitedAsString = (await import_meta_resolve_result) as string;
  // In theory we should convert `URL` to a string. But all environments accept `URL`.
  return await import(awaitedAsString);
}

async function fileURL(
  import_meta_resolve_result: ImportMetaResolveResult,
): Promise<URL> {
  return new URL(await import_meta_resolve_result, "file://");
}

async function loadTextNode(
  import_meta_resolve_result: ImportMetaResolveResult,
) {
  const readFile = await readFileFunction();
  return readFile(await fileURL(import_meta_resolve_result), "utf-8");
}

// Load JSON using either `fetch(…)` or `node:fs/promises`
export async function loadText(
  import_meta_resolve_result: ImportMetaResolveResult,
): Promise<string> {
  try {
    return (await fetch(await import_meta_resolve_result)).text();
  } catch {
    return loadTextNode(import_meta_resolve_result);
  }
}

// Load JSON using either `fetch(…)` or `node:fs/promises`
export async function loadJSON(
  import_meta_resolve_result: ImportMetaResolveResult,
  // rome-ignore lint/suspicious/noExplicitAny: JSON data has type `any` in TypeScript
): Promise<any> {
  try {
    return (await fetch(await import_meta_resolve_result)).json();
  } catch {
    return JSON.parse(await loadTextNode(import_meta_resolve_result));
  }
}

export async function loadBlob(
  import_meta_resolve_result: ImportMetaResolveResult,
): Promise<Blob> {
  try {
    return (await fetch(await import_meta_resolve_result)).blob();
  } catch {
    const readAsBlob = await readAsBlobFunction();
    return readAsBlob(await fileURL(await import_meta_resolve_result));
  }
}

// This is a convenience function that just calls `(await loadBlob(…)).arrayBuffer()` (which is sufficiently compatible).
export async function loadArrayBuffer(
  import_meta_resolve_result: ImportMetaResolveResult,
): Promise<ArrayBuffer> {
  return (await loadBlob(import_meta_resolve_result)).arrayBuffer();
}
