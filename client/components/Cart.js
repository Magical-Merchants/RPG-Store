import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { fetchCart, addToCart, removeFromCart } from '../store/cart'


// export const Cart = ( { cart }) => {

class Cart extends React.Component {
  
  componentDidMount() {
    this.props.fetchCart();
  }
  
  render() {
    
    const lineItems = this.props.cart.lineItems || [];
    
    return (
    <ul>
    {
      lineItems.map(lineItem => {
        return (
        <li key={lineItem.id}>
        {lineItem.product.title}
        <img src= {lineItem.product.photoUrl}/>
        ${lineItem.price}
        Quantity: {lineItem.quantity}
        <button>Add 1</button>
        <button>Remove 1</button>
        </li>
        )
      })
    }
    </ul>
    )
  }
  
}

const mapState = (state) => {
  return {
    cart: state.cart
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchCart: () => {
      dispatch(fetchCart());
    },
    addToCart: (product) => {
      dispatch(addToCart(product));
    },
    removeFromCart: (product) => {
      dispatch(removeFromCart(product));
    }
  };
};

export default connect(mapState, mapDispatch)(Cart)
