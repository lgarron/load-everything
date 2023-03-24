export default {
  mode: "production",
  entry: {
    "entry": "./test/entry.js", "entry-verbose": "./test/entry-verbose.js"
  },
  output: {
    path: new URL("./dist/test-webpack", import.meta.url).pathname,
  },
};
