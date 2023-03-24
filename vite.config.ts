export default {
  root: "test",
  base: "./",
  build: {
    outDir: new URL("./dist/test-vite", import.meta.url).pathname,
    rollupOptions: {
      input: {
        "index": "./test/index.html",
        "index-verbose": "./test/verbose/index.html"
      }
    }
  }
}
