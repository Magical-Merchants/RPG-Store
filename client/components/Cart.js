import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchCart, addToCart, removeFromCart} from '../store/cart'
import {createPaymentIntent} from '../store/checkout'
// import {createCheckoutSession} from '../store/checkout'
// import CheckoutButton from './CheckoutButton'
import Checkout from './Checkout'
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'

// export const Cart = ( { cart }) => {

class Cart extends React.Component {
  componentDidMount() {
    this.props.fetchCart()
    this.props.createPaymentIntent(this.props.cart)
  }

  render() {
    const lineItems = this.props.cart.lineItems || []
    const stripePromise = loadStripe('pk_test_51LVGONGcpsizPzHCUo3CS2w8OyaVqC0njHW1VPA1KtpUBREtCSMyYZp4q3w4DU0ocT1xl1yLTIAwIhAN95c1HHlE0019PSgAKo')
    const clientSecret = createPaymentIntent(this.props.cart).clientSecret
    const options = {
      clientSecret,
      // appearance,
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
                <button
                  type="button"
                  onClick={() => this.props.addToCart(lineItem.product)}
                >
                  Add 1
                </button>
                <button
                  type="button"
                  onClick={() => this.props.removeFromCart(lineItem.product)}
                >
                  Remove 1
                </button>
              </li>
            )
          })}
        </ul>
        {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <Checkout />
        </Elements>
      )}
        {/* <Link to ={'/checkout'}>Checkout</Link> */}
        {/* //checkout button, list of orders, total price */}
        {/* <CheckoutButton/> */}
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    cart: state.cart, 
    payment: state.payment 
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchCart: () => {
      dispatch(fetchCart())
    },
    addToCart: (product) => {
      dispatch(addToCart(product))
    },
    removeFromCart: (product) => {
      dispatch(removeFromCart(product))
    },
    createPaymentIntent: (order) => {
      dispatch(createPaymentIntent(order))
    },
  }
}

export default connect(mapState, mapDispatch)(Cart)
