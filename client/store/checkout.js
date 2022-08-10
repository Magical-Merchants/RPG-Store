import axios from 'axios'

const TOKEN = 'token'

const initalState = {}

// action type:
const CREATE_PAYMENT_INTENT = 'CREATE_PAYMENT_INTENT'

// action creators:
const createdPaymentIntent = (payment) => ({
  type: CREATE_PAYMENT_INTENT,
  payment,
})

// thunk creators:
export const createPaymentIntent = (order) => {
  const token = window.localStorage.getItem(TOKEN)
  return async (dispatch) => {
    try {
      const {data} = await axios
        .post('/api/create-payment-intent', order, {
          headers: {
            authorization: token,
            'Content-Type': 'application/json',
            body: {items: order.lineItems},
          },
        })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret))

      dispatch(createdPaymentIntent(data))
    } catch (error) {
      console.error(error)
    }
  }
}

const options = {
  clientSecret,
  appearance,
}

// reducer:
export default function checkoutReducer(state = {}, action) {
  switch (action.type) {
    case CREATE_PAYMENT_INTENT:
      return action.payment
    default:
      return state
  }
}
