import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getProducts } from "../store/products";
import { addToCart } from "../store/cart";

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts();
  }
  render() {
    
    return (
    <div>
      <h2>Products</h2>
    
     {this.props.products.map (product => (
     
     <div key={product.id}>
     
      <Link to={`/products/${product.id}`}>
        <h3>{product.title}</h3>
          <div>
          <p>Price: ${product.price}</p>
          <p>In stock: {product.inventoryQty}</p>
          </div>
        <img src= {product.photoUrl}/>
      </Link>
      
      <p><button onClick={() => this.props.addToCart(product)}>Add {product.title} to Cart</button></p>
      
     </div>
    
     ))}
    </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products.allProducts,
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProducts: () => {
      dispatch(getProducts());
    },
    addToCart: (product) => {
      dispatch(addToCart(product));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);