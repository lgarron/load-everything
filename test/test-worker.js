import { config } from "./config.js";

export async function testWorker(workerPath) {
  return new Promise(async (resolve, reject) => {
    try {
      const workerConstructor = globalThis.Worker ?? (await import("worker_threads")).Worker;
      const useNodeWorkarounds = !globalThis.Worker;

      if (config.verbose) { console.info("📄 workerPath", workerPath) }
      if (!workerConstructor) {
        resolve(false);
        return;
      }
      let worker;
      try {
        worker = new workerConstructor(workerPath, { type: "module" });
      } catch (e) {
        if (!useNodeWorkarounds) {
          throw e;
        }
        console.warn("Worker constructor did not accept the given path. Wrapping in `new URL()` as a fallback for `node`.")
        worker = new workerConstructor(new URL(workerPath), { type: "module" });
      }
      setTimeout(() => {
        reject(new Error("worker load timed out"));
      }, 2000);
      await new Promise((resolve, _) => {
        // EventTarget
        worker.addEventListener?.("message", (e) => {
          resolve(e.data === "ready")
        }, { once: true });
        // EventEmitter (node)
        worker.once?.("message", (message) => {
          resolve(message === "ready")
        }, { once: true });
      });
      // EventTarget
      worker.addEventListener?.("message", (e) => {
        resolve(e.data === "okay")
      });
      // EventEmitter (node)
      worker.on?.("message", (message) => {
        resolve(message === "okay")
      });
      worker.postMessage("test");
    } catch (e) {
      reject(e)
    }
  });
}
