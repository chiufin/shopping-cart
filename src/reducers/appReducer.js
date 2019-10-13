import {
  LOAD_PRODUCTS_DATA_SUCCESS,
  LOAD_PRODUCTS_DATA_FAILURE,
  LOAD_PRODUCTS_DATA_REQUEST,
  LOAD_PRODUCTS_DATA
} from '../actions/actionTypes'

const initialState = {
  products: [],
  isLoading: false,
  hasError: false,
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case LOAD_PRODUCTS_DATA_REQUEST: {
      return {
        ...state,
        isLoading: true,
        hasError: false,
      }
    }
    case LOAD_PRODUCTS_DATA: {
      return {
        ...state,
        isLoading: true,
        hasError: false,
      }
    }
    case LOAD_PRODUCTS_DATA_SUCCESS: {
      const { data } = action

      const { products = [] } = data

      const productDetails = products.map((product) => {
        const { productId, title, price, image, sku } = product
        return { productId, title, price, image, sku }
      })
      return {
        ...state,
        isLoading: false,
        hasError: false,
        products: productDetails,
      }
    }
    case LOAD_PRODUCTS_DATA_FAILURE: {
      return {
        ...state,
        isLoading: false,
        hasError: true,
      }
    }
    default: {
      return state
    }
  }
}

export const getProducts = state => state.app.products
