import { combineReducers } from 'redux'
import app from './appReducer'
import basket from './basketReducer'

const rootReducer = combineReducers({
  app,
  basket,
})

export default rootReducer
