/* eslint-disable */

const mockStore = {
  dispatch: jest.fn(),
  subscribe: jest.fn(),
  getState: jest.fn(),
  replaceReducer: jest.fn(),
  runSaga: jest.fn(),
  close: jest.fn(),
}

const mockModules = ['demoPage1']

const mockSetup = (env) => {
  process.env.NODE_ENV = env
  return require('../HtmlHelper.js')
}


describe('HTML Helper Tests', () => {
  beforeEach(() => {
    process.env.NODE_ENV = 'dev'
    jest.resetModules()
    process.env.NODE_ENV = 'dev'
    delete process.env.NODE_ENV
  })

  afterEach(() => {
    delete process.env.NODE_ENV
  })

  it('fake test', () => expect(true).toBe(true))
})
