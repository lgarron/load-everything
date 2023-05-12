# Load everything

It is now fairly feasible to publish JavaScript that can [load everything](https://loadeverything.net/) across all major JavaScript environments:

- Chromium-based browsers
  - Chrome
  - Edge
  - Opera
  - Brave, Vivaldi, etc.
- Safari
- Firefox
- `node`
- `deno`
- `bun`

However, some environments have small quirks. `load-everything` implements those quirks so you can write compatible code without having to test and research them from scratch.

## Usage

Call `import.meta.resolve(…)` and pass the output directly to one of the provided functions.

```ts
import { loadJSON } from "load-everything";

loadJSON(import.meta.resolve("./data.json"));
```

## API

```ts
function dynamicImport(import.meta.resolve(…)): Promise<any>;
function loadText(import.meta.resolve(…)): Promise<string>;
function loadJSON(import.meta.resolve(…)): Promise<any>;
function loadBlob(import.meta.resolve(…)): Promise<Blob>;
function loadArrayBuffer(import.meta.resolve(…)): Promise<ArrayBuffer>;
```

### URL

For code code that is more widely compatible with older environments and bundlers, you can use `import.meta.url` to construct a URL instead, and pass this to any of the functions:

```ts
import { loadJSON } from "load-everything";

loadJSON(new URL("./data.json", import.meta.url));
```
