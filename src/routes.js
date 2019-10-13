import { matchPath } from 'react-router-dom'

import {
  loadProductsData
} from './actions/appActions'

export const homeRoute = {
  path: '/',
  fetch: () => loadProductsData(),
  pageTitle: 'Home',
}

// Adding a new route? Make sure it has analytics!
export const routes = [
  homeRoute,
]

// Returns the `route` config for a given path
export const getRoute = path => routes.find(route => matchPath(path, route))

// Triggers the action associated with a route. Used for SSR to
// wait for actions to complete before rendering the page.
export const processRoutes = (store, req) => {
  routes.some((route) => {
    const match = matchPath(req.path, route)
    if (match && typeof route.fetch === 'function') {
      store.dispatch(route.fetch(match))
    }
    return match
  })
}

// Returns the pageTitle for a given route
export const getPageTitle = path => (getRoute(path) && getRoute(path).pageTitle) || 'Argos UI Dev Test'
