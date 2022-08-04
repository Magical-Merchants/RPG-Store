import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
  //not sure if we will use this
import { getSingleProduct } from "..store/products";

class SingleProduct extends React.Component {
  
  componentDidMount() {
    this.props.getSingleProduct(this.props.match.params.productId);
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

    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    product: state.products.singleProduct,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSingleProduct: (id) => {
      dispatch(getSingleProduct(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
