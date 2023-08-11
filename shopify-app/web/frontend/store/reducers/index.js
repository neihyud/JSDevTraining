import { combineReducers } from 'redux'
import productReducer from './product'
import collectionReducer from './collection'

const rootReducer = combineReducers({
  products: productReducer,
  collections: collectionReducer,
})

export default rootReducer
