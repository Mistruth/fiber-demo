export default {
  input: "src/index.js",
  output: [
    {
      file: "dist/luba.js",
      format: "cjs",
      esModule: false,
      sourcemap: false
    },
    {
      file: "dist/luba-umd.js",
      format: "umd",
      esModule: false,
      name: "luba",
      sourcemap: false
    },
    {
      file: "dist/luba-esm.js",
      format: "esm",
      esModule: false,
      sourcemap: false
    }
  ]
}
