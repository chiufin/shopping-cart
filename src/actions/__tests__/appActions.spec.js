import * as actions from '../appActions'
import * as types from '../actionTypes'

describe('App actions', () => {
  it('should create an action for app loaded', () => {
    const expectedAction = {
      type: types.LOAD_APP,
    }
    expect(actions.loadApp()).toEqual(expectedAction)
  })
  describe('Products actions', () => {
    it('should create an action for products data action', () => {
      const expectedAction = {
        type: types.LOAD_PRODUCTS_DATA,
      }
      expect(actions.loadProductsData()).toEqual(expectedAction)
    })
    it('should create an action for Products Request', () => {
      const expectedAction = {
        type: types.LOAD_PRODUCTS_DATA_REQUEST,
      }
      expect(actions.loadProductsDataRequest()).toEqual(expectedAction)
    })

    it('should create an action for loadProductsDataSuccess', () => {
      const expectedAction = {
        type: types.LOAD_PRODUCTS_DATA_SUCCESS,
        data: {
          products: [
            { 1: 5 },
          ],
        },
      }
      expect(actions.loadProductsDataSuccess({ products: [{ 1: 5 }] })).toEqual(expectedAction)
    })

    it('should create an action for loadProductsDataFailure', () => {
      const expectedAction = {
        type: types.LOAD_PRODUCTS_DATA_FAILURE,
      }
      expect(actions.loadProductsDataFailure()).toEqual(expectedAction)
    })
  })
})
