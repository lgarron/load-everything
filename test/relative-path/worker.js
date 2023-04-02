// Mangled so that bundlers don't try to inline the source.
const worker_threads_mangled = "node:w-orker-_threa-ds";
const worker_threads_unmangled = () => worker_threads_mangled.replace(/-/g, "");

globalThis.addEventListener?.("message", (e) => {
  if (e.data === "test") {
    globalThis.postMessage("okay")
  } else {
    globalThis.postMessage("unexpected message!")
  }
});
globalThis.postMessage?.("ready");

if (!globalThis.addEventListener) {
  // Theoretically, we don't need an async AIIFE. But not all bundlers support
  // top-level await out of the box (and the ones that do might be buggy), and
  // that is outside the scope of what we're testing. So we use an IIFE wrapper.
  (async () => { 
    const { parentPort } = await import(worker_threads_unmangled());
    parentPort.on("message", (message) => {
      if (message === "test") {
        parentPort.postMessage("okay")
      } else {
        parentPort.postMessage("unexpected message!")
      }
    });
    parentPort.postMessage("ready");
  })();
}
