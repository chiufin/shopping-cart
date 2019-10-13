import reducer, { getProducts } from '../appReducer'
import {
  LOAD_PRODUCTS_DATA_SUCCESS,
  LOAD_PRODUCTS_DATA_FAILURE,
  LOAD_PRODUCTS_DATA_REQUEST
} from '../../actions/actionTypes'

const initialState = {
  products: [],
  isLoading: false,
  hasError: false,
}

describe('app reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  describe('when a request is made to the Products API', () => {
    const state = {
      ...initialState,
      isLoading: false,
      hasError: true,
    }

    const updatedState = reducer(state, {
      type: LOAD_PRODUCTS_DATA_REQUEST,
    })

    it('should set the isLoading state to true', () => {
      expect(updatedState.isLoading).toBe(true)
    })

    it('should set the hasError state to false', () => {
      expect(updatedState.hasError).toBe(false)
    })
  })

  describe('when a successful response is returned from the Products API', () => {
    const state = {
      ...initialState,
      isLoading: true,
      hasError: true,
    }

    const updatedState = reducer(state, {
      type: LOAD_PRODUCTS_DATA_SUCCESS,
      data: {
        isLoading: false,
        products: [{
          image: '/image/test',
          price: '999',
          productId: '888',
          title: 'test title',
          sku: '123/455',
        }],
      },
    })

    it('should set the isLoading state to false', () => {
      expect(updatedState.isLoading).toBe(false)
    })

    it('should set the hasError state to false', () => {
      expect(updatedState.hasError).toBe(false)
    })

    it('should update the state with the values from the API', () => {
      expect(updatedState).toEqual({
        products: [{
          image: '/image/test',
          price: '999',
          productId: '888',
          title: 'test title',
          sku: '123/455',
        }],
        isLoading: false,
        hasError: false,
      })
    })
  })

  describe('when an unsuccessful response is returned from the Products Info API', () => {
    const state = {
      isLoading: true,
      hasError: false,
    }

    const updatedState = reducer(state, {
      type: LOAD_PRODUCTS_DATA_FAILURE,
    })

    it('should set the isLoading state to false', () => {
      expect(updatedState.isLoading).toBe(false)
    })

    it('should set the hasError state to true', () => {
      expect(updatedState.hasError).toBe(true)
    })

    it('should reset the state back to the default values', () => {
      expect(updatedState).toEqual({
        isLoading: false,
        hasError: true,
      })
    })
  })
})

describe('getProducts', () => {
  it('gets available products from state', () => {
    const state = {
      app: {
        products: [
          {
            title: 'Fake Title',
            price: '1 million dollars',
          },
        ],
      },
    }
    expect(getProducts(state)).toEqual([
      {
        title: 'Fake Title',
        price: '1 million dollars',
      },
    ])
  })
})
