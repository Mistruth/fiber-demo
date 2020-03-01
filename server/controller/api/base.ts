import { RouterContext } from 'koa-router'
import App from '../../../client/App'
import React from 'react'
import { renderToString } from 'react-dom/server'
const manifest = require('../../../dist/manifest.json')


const base = async function(ctx: RouterContext){
  const string = renderToString(React.createElement(App))
  ctx.body = `
  <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>react</title>
    </head>
    <body>
      <div id="app">
        ${string}
      </div>
    </body>
    <script src="./${manifest['main.js']}"></script>
    </html>
  `
}

export default base