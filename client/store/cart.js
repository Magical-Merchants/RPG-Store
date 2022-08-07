//add to combinereducers
import axios from 'axios'

const TOKEN = 'token'

const initalState = {cart: {}}

// action type:
const SET_CART = 'SET_CART'

// action creators:
const setCart = (cart) => ({type: SET_CART, cart})
const removedFromCart = (product) => ({type: SET_CART, product})
const addedToCart = (product) => ({type: SET_CART, product})

// thunk creators:
export const fetchCart = () => {
  const token = window.localStorage.getItem(TOKEN)
  return async (dispatch) => {
    try {
      const {data} = await axios.get('/api/cart', {
        headers: {
          authorization: token,
        },
      })
      dispatch(setCart(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const addToCart = (product) => {
  const token = window.localStorage.getItem(TOKEN)
  return async (dispatch) => {
    try {
      const {data} = await axios.post('/api/cart/addToCart', {
        headers: {
          authorization: token,
        },
      })
      dispatch(addedToCart(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const removeFromCart = (product) => {
  const token = window.localStorage.getItem(TOKEN)
  return async (dispatch) => {
    try {
      const {data} = await axios.post('/api/cart/removeFromCart', {
        headers: {
          authorization: token,
        },
      })
      dispatch(removedFromCart(data))
    } catch (error) {
      console.error(error)
    }
  }
}

// reducer:
export default function cartReducer(state = initalState, action) {
  switch (action.type) {
    case SET_CART:
      return {...state, allProducts: action.products}
    default:
      return state
  }
}
