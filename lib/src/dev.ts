import { dynamicImport, loadJSON } from "./index";
import { testWorker } from "./test-worker";

(async () => {
  // @ts-ignore
  console.log(await loadJSON(import.meta.resolve("./data.json")));

  const lib = await dynamicImport(import.meta.resolve("./code.js"));
  console.log(lib.test());
})();
