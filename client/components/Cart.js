import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

// const Cart = () => {
//   return (
//     <div>
//       <h1>Cart</h1>
      
//     </div>
//   )
// }

export const Cart = ( { cart }) => {
  const lineItems = cart.lineItems || [];
  
  return (
    <ul>
    {
      lineItems.map(lineItem => {
        return (
        <li key={lineItem.id}>
        {lineItem.product.title}
        {lineItem.product.photoUrl}
        ${lineItem.price}
        Quantity: {lineItem.quantity}
        </li>
        )
      })
    }
    </ul>
    )
}

const mapState = state => {
  return {
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  //get cart
  //add to cart
  //remove from cart
}

export default connect(mapState, mapDispatch)(Cart)
