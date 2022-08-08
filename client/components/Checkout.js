import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { fetchCart } from '../store/cart'

class Checkout extends React.Component {
  
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
    };
  };
  
  export default connect(mapState, mapDispatch)(Checkout)