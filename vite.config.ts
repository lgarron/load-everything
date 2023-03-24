export default {
  root: "test",
  base: "./",
  build: {
    outDir: new URL("./dist/test-vite", import.meta.url).pathname
  }
}
