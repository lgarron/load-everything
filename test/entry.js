console.log("Starting tests.");
import { config } from "./config.js";

async function testLoad(resourceType, loadFn) {
  try {
    const result = await loadFn();
    if (result === true) {
      console.log("✅", resourceType);
    } else if (result === null) {
      console.log("[Look in the DOM]", resourceType);
    } else {
      console.error("❌", resourceType);
    }
  } catch(e) {
    if (config.verbose) {
      console.error("❌", resourceType, e);
    } else {
      console.error("❌", resourceType, e?.__proto__?.name);
    }
  }
}

(async () => {
  await testLoad("JS (sync import.meta.resolve)", async () => {
    const libPath = import.meta.resolve("./indirect-path/code.js");
    if (config.verbose) { console.info("📄 libPath", libPath) }
    return (await import(libPath)).test() == "okay";
  });

  await testLoad("JS (async import.meta.resolve)", async () => {
    const libPath = await import.meta.resolve("./indirect-path/code.js");
    if (config.verbose) { console.info("📄 libPath", libPath) }
    return (await import(libPath)).test() == "okay";
  });

  await testLoad("JS (new URL)", async () => {
    const libPath = new URL("./indirect-path/code.js", import.meta.url);
    if (config.verbose) { console.info("📄 libPath", libPath) }
    return (await import(libPath)).test() == "okay";
  });

  await testLoad("JSON fetch (sync import.meta.resolve)", async () => {
    const jsonPath = import.meta.resolve("./relative-path/data.json");
    if (config.verbose) { console.info("📄 jsonPath", jsonPath) }
    const response = await fetch(jsonPath);
    return (await response.json())["value"] == "okay";
  });

  await testLoad("JSON fetch (async import.meta.resolve)", async () => {
    const jsonPath = await import.meta.resolve("./relative-path/data.json");
    if (config.verbose) { console.info("📄 jsonPath", jsonPath) }
    const response = await fetch(jsonPath);
    return (await response.json())["value"] == "okay";
  });

  await testLoad("JSON fetch (new URL)", async () => {
    const jsonPath = new URL("./relative-path/data.json", import.meta.url);
    if (config.verbose) { console.info("📄 jsonPath", jsonPath) }
    const response = await fetch(jsonPath);
    return (await response.json())["value"] == "okay";
  });

  await testLoad("Image (sync import.meta.resolve)", async () => {
    const imagePath = import.meta.resolve("./relative-path/poster.jpeg");
    if (config.verbose) { console.info("📄 imagePath", imagePath) }
    if (globalThis.document) {
      const img = globalThis.document.body.querySelector("#image-import_meta_resolve").appendChild(document.createElement("img"))
      img.src = imagePath;
    }
    return null;
  });

  await testLoad("Image (async import.meta.resolve)", async () => {
    const imagePath = await import.meta.resolve("./relative-path/poster.jpeg");
    if (config.verbose) { console.info("📄 imagePath", imagePath) }
    if (globalThis.document) {
      const img = globalThis.document.body.querySelector("#image-async_import_meta_resolve").appendChild(document.createElement("img"))
      img.src = imagePath;
    }
    return null;
  });

  await testLoad("Image (new URL)", async () => {
    const imagePath = new URL("./relative-path/poster.jpeg", import.meta.url);
    if (config.verbose) { console.info("📄 imagePath", imagePath) }
    if (globalThis.document) {
      const img = globalThis.document.body.querySelector("#image-new_URL").appendChild(document.createElement("img"))
      img.src = imagePath;
    }
    return null;
  });

  await testLoad("Web worker (sync import.meta.resolve)", async () => {
    return new Promise((resolve, reject) => {
      try {
        const workerPath = import.meta.resolve("./indirect-path/worker.js");
        if (config.verbose) { console.info("📄 workerPath", workerPath) }
        if (!globalThis.Worker) {
          resolve(false);
          return;
        }
        const worker = new Worker(workerPath, { type: "module" });
        worker.addEventListener("message", (e) => {
          resolve(e.data === "okay")
        });
        worker.postMessage("test");
        setTimeout(() => {
          reject(new Error("worker load timed out"));
        }, 2000);
      } catch (e) {
        reject(e);
      }
    });
  });

  await testLoad("Web worker (async import.meta.resolve)", async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const workerPath = await import.meta.resolve("./indirect-path/worker.js");
        if (config.verbose) { console.info("📄 workerPath", workerPath) }
        if (!globalThis.Worker) {
          resolve(false);
          return;
        }
        const worker = new Worker(workerPath, { type: "module" });
        worker.addEventListener("message", (e) => {
          resolve(e.data === "okay")
        });
        worker.postMessage("test");
        setTimeout(() => {
          reject(new Error("worker load timed out"));
        }, 2000);
      } catch (e) {
        reject(e);
      }
    });
  });

  await testLoad("Web worker (new URL)", async () => {
    return new Promise((resolve, reject) => {
      try {
        const workerPath = new URL("./indirect-path/worker.js", import.meta.url);
        if (config.verbose) { console.info("📄 workerPath", workerPath) }
        if (!globalThis.Worker) {
          resolve(false);
          return;
        }
        const worker = new Worker(workerPath, { type: "module" });
        worker.addEventListener("message", (e) => {
          resolve(e.data === "okay")
        });
        worker.postMessage("test");
        setTimeout(() => {
          reject(new Error("worker load timed out"));
        }, 2000);
      } catch (e) {
        reject(e);
      }
    });
  });

  await testLoad("WASM (sync import.meta.resolve)", async () => {
    const hello_wasm = await import("./indirect-path/hello_wasm_import_meta_resolve.js");
    await hello_wasm.default(config.verbose);
    return hello_wasm.test() == "okay";
  });

  await testLoad("WASM (async import.meta.resolve)", async () => {
    const hello_wasm = await import("./indirect-path/hello_wasm_async_import_meta_resolve.js");
    await hello_wasm.default(config.verbose);
    return hello_wasm.test() == "okay";
  });

  await testLoad("WASM (new URL)", async () => {
    const hello_wasm = await import("./indirect-path/hello_wasm_new_URL.js");
    await hello_wasm.default(config.verbose);
    return hello_wasm.test() == "okay";
  });

  // // Arbitrary resources
  // const resourcePath = import.meta.resolve("./resource");
  // const response = await fetch(resourcePath);
  // // binary
  // console.log(await response.arrayBuffer());
  // // text
  // console.log(await response.text());

  console.log("Tests finished.")
})();
