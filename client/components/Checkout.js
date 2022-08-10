import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchCart} from '../store/cart'
import {createPaymentIntent} from '../store/checkout'
import {PaymentElement, useStripe, useElements} from '@stripe/react-stripe-js'

class Checkout extends React.Component {
  componentDidMount() {
    this.props.createPaymentIntent()
    this.props.fetchCart()
  }

  render() {
    // const stripePromise = loadStripe(process.env.STRIPE_PRIVATE_KEY)
    const lineItems = this.props.cart.lineItems || []

    return (
      <div>
        <ul>
          {lineItems.map((lineItem) => {
            return (
              <li key={lineItem.id}>
                {lineItem.product.title}
                <img src={lineItem.product.photoUrl} />${lineItem.price}
                Quantity: {lineItem.quantity}
              </li>
            )
          })}
        </ul>

        <form id="payment-form" onSubmit={handleSubmit}>
          <PaymentElement id="payment-element" />
          <button disabled={isLoading || !stripe || !elements} id="submit">
            <span id="button-text">
              {isLoading ? (
                <div className="spinner" id="spinner"></div>
              ) : (
                'Pay now'
              )}
            </span>
          </button>
          s{message && <div id="payment-message">{message}</div>}
        </form>
        {/* Total Cost: $
          {lineItems.reduce(
            (accum, lineItem) => accum + lineItem.price * lineItem.quantity,
            0
          )}
        </div>
        <div>Shipping Information:</div>
        <div>Credit Card Information:</div>
        <div>comfirmation button:</div> */}
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    cart: state.cart,
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchCart: () => {
      dispatch(fetchCart())
    },
    createPaymentIntent: (paymentIntent) => {
      dispatch(createPaymentIntent(paymentIntent))
    },
  }
}

export default connect(mapState, mapDispatch)(Checkout)
