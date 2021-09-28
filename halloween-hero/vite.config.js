const path = require("path");
const { defineConfig } = require("vite");

module.exports = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/main.js"),
      name: "MyLib",
      fileName: (format) => `my-lib.${format}.js`,
      type: "iife",
    },
    rollupOptions: {
      inlineDynamicImports: true,
      output: {
        manualChunks: () => "everything.js",
      },
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      //   external: ["vue"],
      // output: {
      //   // Provide global variables to use in the UMD build
      //   // for externalized deps
      //   file: "bundle.js",
      //   format: "es",
      //   paths: {
      //     d3: "https://d3js.org/d3.v4.min",
      //   },
      // },
    },
  },
});
