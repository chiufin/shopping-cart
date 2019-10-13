import { call, put, select, takeLatest } from 'redux-saga/effects'
import { cloneableGenerator } from 'redux-saga/utils'
import {
  watchLoadApp,
  loadApp,
  loadProductsDataSaga,
  watchloadProductsData
} from '../appSaga'
import {
  LOAD_APP, LOAD_PRODUCTS_DATA
} from '../../actions/actionTypes'
import { productsDataAlreadyLoaded, loadProductsDataRequest, loadProductsDataSuccess, loadProductsDataFailure } from '../../actions/appActions'
import { fetchProducts } from '../../api/productsApi'
import { FailedRequest } from '../../errors'
import { getProducts } from '../../reducers/appReducer'

const mockError = {
  message: 'Internal Server Error',
  response: {
    status: 500,
  },
}

describe('app saga', () => {
  describe('loadApp', () => {
    const generator = loadApp()
    const next = generator.next()
    expect(next.value).toEqual(console.log('app loaded'))
  })
  describe('watchLoadApp', () => {
    it('load app when app page loads', () => {
      const generator = watchLoadApp()
      const next = generator.next()

      expect(next.value).toEqual(takeLatest(LOAD_APP, loadApp))
    })
  })

  // Multiple products
  describe('when loading the products', () => {
    describe('and there is already data', () => {
      const generator = cloneableGenerator(loadProductsDataSaga)()
      it('should get product data', () => {
        expect(generator.next().value).toEqual(select(getProducts))
      })
      it('should NOT do another call to get product data', () => {
        expect(generator.next([{ 1: 2 }]).value).toEqual(put(productsDataAlreadyLoaded()))
      })
    })
    describe('and there are NOT already products', () => {
      const generator = cloneableGenerator(loadProductsDataSaga)()
      it('should get product data', () => {
        expect(generator.next().value).toEqual(select(getProducts))
      })
      it('should inform the UI that a request is being made', () => {
        expect(generator.next([]).value).toEqual(put(loadProductsDataRequest()))
      })
      it('should call the product api', () => {
        expect(generator.next().value).toEqual(call(fetchProducts))
      })
      describe('and the call is successful', () => {
        it('successfully completes the call', () => {
          const next = generator.next({ data: { 1: 2 } })
          expect(next.value).toEqual(put(loadProductsDataSuccess({
            data: { 1: 2 },
          })))
        })
      })
      describe('and the call is unsuccessful', () => {
        const failGenerator = loadProductsDataSaga()
        it('throws an error', () => {
          failGenerator.next()
          const next = failGenerator.throw(new FailedRequest(mockError, 'error with product api'))
          expect(next.value).toEqual(put(loadProductsDataFailure(new FailedRequest(mockError, 'error with product api'))))
        })
      })
    })
  })


  describe('watchloadProductsData', () => {
    it('Watches the load products data saga', () => {
      const generator = watchloadProductsData()
      const next = generator.next()

      expect(next.value).toEqual(takeLatest(LOAD_PRODUCTS_DATA, loadProductsDataSaga))
    })
  })
})
