import {
  ADD_PRODUCT_TO_BASKET,
  REMOVE_PRODUCT_FROM_BASKET
} from './actionTypes'


// Products Data Actions
export const addProductToBasket = product => ({ type: ADD_PRODUCT_TO_BASKET, payload: product })

export const removeProductFromBasket = product => ({ type: REMOVE_PRODUCT_FROM_BASKET, payload: product })
