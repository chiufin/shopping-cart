import serialize from 'serialize-javascript'
import { getPageTitle } from '../routes'

import { nconf } from '../../config/envconfig/envConfig'

const NODE_ENV = nconf.get('NODE_ENV') || process.env.NODE_ENV
const isDevelopment = NODE_ENV !== 'production'

// Stores the location of files with their hashes, e.g. confirmation.js
// becomes `/assets/argos/client/chunk-1.a1b2c3d4.js` in production
const manifestFiles = () => {
  if (!isDevelopment) {
    try {
      const assetManifest = require('../../dist/asset-manifest.json')
      return assetManifest
    } catch (err) {
      console.error('\nThe asset-manifest.json file is missing!')
      throw err
    }
  }
  return false
}

const getChunks = (chunks, format) => {
  const modules = []
  for (let i = 0; i < chunks.length; i += 1) {
    const moduleName = chunks[i]
    if (format === 'css') {
      if (isDevelopment) modules.push(`<link rel="stylesheet" type="text/css" href="/assets/argos/client/chunk-${moduleName}.css" />`)
      else modules.push(`<link rel="stylesheet" type="text/css" href="${manifestFiles()[`${moduleName}.css`]}" />`)
    }
    if (format === 'js') {
      if (isDevelopment) modules.push(`<script type="text/javascript" src="/assets/argos/client/chunk-${moduleName}.js"></script>`)
      else modules.push(`<script type="text/javascript" src="${manifestFiles()[`${moduleName}.js`]}"></script>`)
    }
  }
  return modules
}

export const HtmlHead = (path, modules) => {
  const mainCss = isDevelopment
    ? '/assets/argos/client/client.css'
    : manifestFiles()['main.css']

  return (
    `<!doctype html><html lang="en-GB">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content="Argos UI Dev Test" />
          <meta name="author" content="Owen Nicol" />
          <meta name="robots" content="noindex" />

          <title>${getPageTitle(path)}</title>

          <link
            href="https://www.argos.co.uk/assets/bolt/1.0.10/css/bolt.min.css"
            media="screen, projection, print"
            rel="stylesheet"
            type="text/css"
            charSet="UTF-8"
          />
          <link
          href="${mainCss}"
            media="all"
            rel="stylesheet"
            type="text/css"
            charSet="UTF-8"
          />
          ${modules && getChunks(modules, 'css')}
        </head>
        <body>
          <div id="content">`
  )
}

export const Footer = (store, modules) => {
  const manifestUrl = false
  const bundleUrl = isDevelopment
    ? '/assets/argos/client/client.js'
    : manifestFiles()['main.js']

  return (
    `</div>
      <script charSet="UTF-8">
        window.__data=${serialize(store.getState())};
        </script>
        ${manifestUrl ? `<script src=${manifestUrl} charSet="UTF-8"></script>` : ''}
        ${modules && getChunks(modules, 'js')}
        <script src=${bundleUrl} charSet="UTF-8"></script>
      </body>
    </html>`
  )
}
