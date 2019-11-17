import serve from "rollup-plugin-serve"
import livereload from "rollup-plugin-livereload"
import htmlTemplate from "rollup-plugin-generate-html-template"

import baseConfig from "./rollup.base.config"
import merge from "merge"

export default merge(baseConfig, {
  watch: {
    include: "src/**"
  },
  plugins: [
    serve("dist"),
    livereload(),
    htmlTemplate({
      template: "demo/index.html",
      target: "../index.html"
    })
  ]
})
