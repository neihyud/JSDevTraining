import { combineReducers } from "redux";
import productReducer from './product'

const rootReducer = combineReducers({
  users: productReducer,
});

export default rootReducer;
