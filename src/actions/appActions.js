import {
  LOAD_APP,
  LOAD_PRODUCTS_DATA,
  LOAD_PRODUCTS_DATA_SUCCESS,
  LOAD_PRODUCTS_DATA_FAILURE,
  LOAD_PRODUCTS_DATA_REQUEST,
  PRODUCTS_DATA_ALREADY_LOADED
} from './actionTypes'

export const loadApp = () => ({
  type: LOAD_APP,
})

// Products Data Actions
export const productsDataAlreadyLoaded = () => ({ type: PRODUCTS_DATA_ALREADY_LOADED })

export const loadProductsData = () => ({ type: LOAD_PRODUCTS_DATA })

export const loadProductsDataRequest = () => ({ type: LOAD_PRODUCTS_DATA_REQUEST })

export const loadProductsDataSuccess = data => ({
  type: LOAD_PRODUCTS_DATA_SUCCESS,
  data,
})

export const loadProductsDataFailure = error => ({
  type: LOAD_PRODUCTS_DATA_FAILURE,
  error,
})
