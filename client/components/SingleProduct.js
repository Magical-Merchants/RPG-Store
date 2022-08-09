import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
  //not sure if we will use this
import { getSingleProduct } from "../store/products";
import { addToCart } from "../store/cart";


class SingleProduct extends React.Component {
  
  componentDidMount() {
    this.props.getSingleProduct(this.props.match.params.id);
  }
  
  render() {
    const product = this.props.product;
    return (
    <div className='single-product'>
    
      <h3> {product.title} </h3>
      
          <p>Description: {product.description}</p>
          <p>Price: {product.price}</p>
          <p>In stock: {product.inventoryQty}</p>
          
        <img src= {product.photoUrl}/>
        
        <p><button onClick={() => this.props.addToCart(product)}>Add to Cart</button></p>

    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    product: state.products.singleProduct,
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSingleProduct: (id) => {
      dispatch(getSingleProduct(id));
    },
    addToCart: (product) => {
      dispatch(addToCart(product));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
