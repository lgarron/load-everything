export default {
  mode: "production",
  target: "es2022",
  entry: {
    "entry": "./test/entry.js",
    "entry-verbose": "./test/entry-verbose.js"
  },
  output: {
    chunkFormat: "module",
    path: new URL("./dist/test-webpack", import.meta.url).pathname,
  },
  module: {
    parser: {
      javascript : { importMeta: false }
    }
  }
};
