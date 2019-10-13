import 'isomorphic-unfetch'
import { call, put, select, takeLatest } from 'redux-saga/effects'
import {
  LOAD_APP,
  LOAD_PRODUCTS_DATA
} from '../actions/actionTypes'
import {
  loadProductsDataFailure,
  loadProductsDataRequest,
  loadProductsDataSuccess,
  productsDataAlreadyLoaded
} from '../actions/appActions'
import { fetchProducts } from '../api/productsApi'
import { getProducts } from '../reducers/appReducer'

// Sagas
export function* loadApp() {
  yield console.log('app loaded')
}

export function* loadProductsDataSaga() {
  try {
    // Get data from state
    const data = yield select(getProducts)
    // If we already have our data in state (from SSR)
    // We don't need to fetch it again
    if (data.length === 0) {
      yield put(loadProductsDataRequest())
      const products = yield call(fetchProducts)
      yield put(loadProductsDataSuccess(products))
    } else {
      yield put(productsDataAlreadyLoaded())
    }
  } catch (err) {
    yield put(loadProductsDataFailure(err))
  }
}

// Watchers
export function* watchLoadApp() {
  yield takeLatest(LOAD_APP, loadApp)
}

export function* watchloadProductsData() {
  yield takeLatest(LOAD_PRODUCTS_DATA, loadProductsDataSaga)
}
