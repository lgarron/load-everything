import { loadJSON } from "./index";

(async () => {
  // @ts-ignore
  console.log(await loadJSON(import.meta.resolve("./data.json")));
})();
