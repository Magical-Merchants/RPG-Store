import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchCart} from '../store/cart'
// import {createPaymentIntent} from '../store/checkout'
import {PaymentElement, useStripe, useElements} from '@stripe/react-stripe-js'

class Checkout extends React.Component {
  componentDidMount() {
    this.props.fetchCart()
  }

  render() {
    // const stripePromise = loadStripe(process.env.STRIPE_PRIVATE_KEY)
    const lineItems = this.props.cart.lineItems || []
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!stripe || !elements) {
        // Stripe.js has not yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
      }
  
      setIsLoading(true);
  
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: process.env.PORT || 8080
          // "http://localhost:8080",
        },
      });
  
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Otherwise, your customer will be redirected to
      // your `return_url`. For some payment methods like iDEAL, your customer will
      // be redirected to an intermediate site first to authorize the payment, then
      // redirected to the `return_url`.
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message);
      } else {
        setMessage("An unexpected error occurred.");
      }
  
      setIsLoading(false);
    };

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
          {message && <div id="payment-message">{message}</div>}
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
  }
}

export default connect(mapState, mapDispatch)(Checkout)
