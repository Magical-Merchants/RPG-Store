//cart
//order history
//rmb to add this to our reducer

import axios from 'axios'

// initalState:
const initalState = {allOrders: [], singleOrder: {}}
// action type:
const GOT_ORDERS = 'GOT_ORDERS'
const GOT_SINGLE_ORDER = 'GOT_SINGLE_ORDER'

// action creators:
const gotAllOrders = (orders) => ({type: GOT_ORDERS, orders})
const gotSingleOrder = (order) => ({type: GOT_SINGLE_ORDER, order})

// thunk creators:
export const getOrders = () => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get('/api/orders/')
      dispatch(gotAllOrders(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const getSingleOrder = (id) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get(`/api/orders/${id}`)
      dispatch(gotSingleOrder(data))
    } catch (error) {
      console.error(error)
    }
  }
}

// reducer:
export default function ordersReducer(state = initalState, action) {
  switch (action.type) {
    case GOT_ORDERS:
      return {...state, allOrders: action.orders}
    case GOT_SINGLE_ORDER:
      return {...state, singleOrder: action.order}
    default:
      return state
  }
}
