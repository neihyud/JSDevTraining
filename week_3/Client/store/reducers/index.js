import { combineReducers } from 'redux'
import userReducer from './user'
import deviceReducer from './device'

const rootReducer = combineReducers({
    users: userReducer,
    devices: deviceReducer,
})

export default rootReducer
