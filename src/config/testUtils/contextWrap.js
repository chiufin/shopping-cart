import { BrowserRouter } from 'react-router-dom'
import { shallow, mount } from 'enzyme'
import { shape } from 'prop-types'

const router = {
  history: new BrowserRouter().history,
  route: {
    location: {},
    match: {},
  },
}

const createContext = () => ({
  context: { router },
  childContextTypes: {
    router: shape({}),
  },
})

// used for testing router wrapped components when content is need to Mount render
export function mountWrap(node) {
  return mount(node, createContext())
}

// used for testing router wrapped components when content is need to Shallow render
export function shallowWrap(node) {
  return shallow(node, createContext())
}
