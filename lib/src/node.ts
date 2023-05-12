// Mangled so that bundlers don't try to inline the source.
const fs_promises_mangled = "node:f-s/promises";
const fs_promises_unmangled = () => fs_promises_mangled.replace(/-/g, "");

// Mangled so that bundlers don't try to inline the source.
const fs_mangled = "node:f-s";
const fs_unmangled = () => fs_mangled.replace(/-/g, "");

/** In theory, it is not necesary to cache the import, as JavaScript runtimes
 * should do that foes us. However, I've seen JavaScript runtimes crash if you
 * try to call `import(…)` too many times, so we implement a cached lazy import.
 *
 * Note that we can't use a static import, as we only want to try to import as a
 * fallback for lack of `fetch(…)` support.
 *
 * Also note that we could use the `...` spread operator to pass arguments on to
 * `readFile`, but I'd like to avoid assuming ES features we don't strictly need. */
let fs_promises_cached: Promise<typeof import("node:fs/promises")> | undefined;
export async function readFileFunction() {
  fs_promises_cached ??= await import(/* vite-ignore */ fs_promises_unmangled());
  return (await fs_promises_cached).readFile;
}

type fsWithOpenAsBlob =typeof import("node:fs") & {
  openAsBlob: (s: string | URL) => Promise<Blob>
}
let fs_cached: Promise<fsWithOpenAsBlob> | undefined;
export async function readAsBlobFunction(): Promise<(s: string | URL) => Promise<Blob>> {
  fs_cached ??= import(/* vite-ignore */ fs_unmangled()) as Promise<fsWithOpenAsBlob>;
  return (await fs_cached).openAsBlob;
}

