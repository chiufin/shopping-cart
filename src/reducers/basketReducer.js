import {
  ADD_PRODUCT_TO_BASKET,
  REMOVE_PRODUCT_FROM_BASKET
} from '../actions/actionTypes'

const initialState = []

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_BASKET: {
      return [
        ...state,
        action.payload
      ]
    }
    case REMOVE_PRODUCT_FROM_BASKET: {
      return state
    }
    default: {
      return state
    }
  }
}
