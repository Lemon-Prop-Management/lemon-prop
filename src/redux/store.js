import { createStore, combineReducers, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import reducer from './reducer'
import paymentReducer from './paymentReducer'

const rootReducer = combineReducers({
    user: reducer,
    payments: paymentReducer
})

export default createStore(rootReducer, applyMiddleware(promiseMiddleware))