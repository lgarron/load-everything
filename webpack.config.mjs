export default {
  entry: "./test/entry.js",
  output: {
    filename: "entry.js",
    path: new URL("./dist/test-webpack", import.meta.url).pathname,
  },
};
