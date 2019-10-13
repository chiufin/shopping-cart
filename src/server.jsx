import '@babel/polyfill'
import 'source-map-support/register'
import 'ignore-styles'

import Express from 'express'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router'
import Loadable from 'react-loadable'
import favicon from 'serve-favicon'
import robots from 'express-robots'
import compression from 'compression'
import http from 'http'
import path from 'path'
import { createMemoryHistory } from 'history'

import { nconf } from '../config/envconfig/envConfig'
import ExpressLogger from './utils/Logger'
import config from './config'
import configureStore from './store/configureStore'
import { HtmlHead, Footer } from './helpers/HtmlHelper'

import rootSaga from './sagas/sagaIndex'
import { processRoutes } from './routes'

import App from './app/App'

const app = new Express()
const server = new http.Server(app)
// disable `X-Powered-By` HTTP header
app.disable('x-powered-by')

app.use(favicon(path.join(__dirname, '../', 'public/', 'favicon.ico')))
app.use(robots({ UserAgent: '*', Disallow: '/' }))
app.use('/health', (req, res) => res.sendStatus(200))

if (nconf.get('NODE_ENV') === 'production') {
  app.use(compression())
}

// Assets
app.use('/assets/argos', Express.static(path.join(process.cwd(), 'dist/')))

app.use((req, res) => {
  const memoryHistory = createMemoryHistory({ initialEntries: [req.path] })
  const store = configureStore(memoryHistory, undefined)

  res.header('cache-control', 'no-cache, max-age=0, must-revalidate, no-store')

  const task = store.runSaga(rootSaga)
  processRoutes(store, req)
  store.close()

  // Waits for asynchronous actions like sagas and API calls
  // before rendering the HTML
  const waitForAsyncActions = [
    task.done,
  ]

  Promise.all(waitForAsyncActions).then(() => {
    global.navigator = { userAgent: req.headers['user-agent'] }

    // As we are code splitting, we need to find out which chunks
    // the SSR uses so the client can use them. <Loadable.Capture>
    // takes a report prop which is called whenever a chunk is used.
    const modules = []

    // Create a context for <StaticRouter>, which will allow us to
    // query for the results of the render.
    const context = {
      status: 200,
    }

    const reactApp = (
      <Loadable.Capture report={moduleName => modules.push(moduleName)}>
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            <App />
          </StaticRouter>
        </Provider>
      </Loadable.Capture>
    )

    // eslint-disable-next-line function-paren-newline
    const html = ReactDOMServer.renderToString(reactApp)

    if (context.url) {
      // Somewhere a `<Redirect>` was rendered
      return res.redirect(context.context || 302, context.url)
    }

    // TODO Might want to rewrite this as html.jsx again
    res.status(context.status).write(HtmlHead(req.path, modules))
    res.write(html)
    res.write(Footer(store, modules))
    return res.end()
  }).catch((e) => {
    ExpressLogger.warn(e, 'Sagas failed to run on load')
  })
})

Loadable.preloadAll().then(() => {
  server.listen(config.port, (err) => {
    if (err) {
      ExpressLogger.fatal(err, 'Server failed to start correctly')
    }
    ExpressLogger.info('Application started')
  })
})
