import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getProducts } from "..store/products";

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
          <p>Price: {product.price}</p>
          <p>In stock: {product.inventoryQty}</p>
          </div>
        <img src= {product.photoUrl}/>
      </Link>
     
     </div>
    
     ))}
    </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products.allProducts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProducts: () => {
      dispatch(getProducts());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);