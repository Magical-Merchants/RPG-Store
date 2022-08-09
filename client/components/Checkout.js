import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchCart} from '../store/cart'

class Checkout extends React.Component {
  componentDidMount() {
    this.props.fetchCart()
  }

  render() {
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
        <div>
          Total Cost: $
          {lineItems.reduce(
            (accum, lineItem) => accum + lineItem.price * lineItem.quantity,
            0
          )}
        </div>
        <div>Shipping Information:</div>
        <div>Credit Card Information:</div>
        <div>comfirmation button:</div>
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
