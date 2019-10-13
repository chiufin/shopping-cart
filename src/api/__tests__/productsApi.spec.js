import { fetchProducts } from '../productsApi'

describe('Products Api', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementationOnce(() => new Promise((resolve) => {
      resolve({
        ok: true,
        status: 200,
        json: () => ({
          name: 'testing',
          data: 'data',
        }),
      })
    }))
  })

  it('Should render a productsApi', () => {
    const productsApi = fetchProducts()
    expect(productsApi).toBeDefined()
  })
})
