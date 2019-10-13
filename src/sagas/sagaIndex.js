import { all, fork } from 'redux-saga/effects'
import { watchLoadApp, watchloadProductsData } from './appSaga'

// We only want to watch the 'watcher' sagas
export default function* root() {
  yield all([
    fork(watchLoadApp),
    fork(watchloadProductsData),
  ])
}
