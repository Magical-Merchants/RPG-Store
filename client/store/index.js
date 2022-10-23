import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import auth from './auth'
import productsReducer from './products'
import usersReducer from './users'
import cartReducer from './cart'
import checkoutReducer from './checkout'

const reducer = combineReducers({
  auth,
  products: productsReducer,
  users: usersReducer,
  cart: cartReducer,
  checkout: checkoutReducer,
})
//state: { auth: authreducer, products: productsreducer}

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './auth'
