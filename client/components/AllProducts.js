import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getProducts } from "../store/products";
import { addToCart } from "../store/cart";
import AddProduct from './AddProduct'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }
  render() {
    const {isAdmin} = this.props
    return (
        <div>
          <h2>Products</h2>
  
          {isAdmin && <AddProduct />}
  
          {this.props.products.map((product) => (
            <div key={product.id}>
              <Link to={`/products/${product.id}`}>
                <h3>{product.title}</h3>
              </Link>
  
              <div>
                <Link to={`/products/${product.id}`}>
                  <p>Price: {product.price}</p>
                </Link>
  
                <Link to={`/products/${product.id}`}>
                  <p>In stock: {product.inventoryQty}</p>
                </Link>
                
              </div>
              <Link to={`/products/${product.id}`}>
                <img src={product.photoUrl} />
              </Link>
              
              <button onClick={() => this.props.addToCart(product)}>Add {product.title} to Cart</button>
            </div>
          ))}
          
        </div>
    )
  }
}




const mapStateToProps = (state) => {
  return {
    products: state.products.allProducts,
    cart: state.cart,
    isAdmin: state.auth.isAdmin,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProducts: () => {
      dispatch(getProducts())
    },
    addToCart: (product) => {
      dispatch(addToCart(product));
    },
    loadInitialData() {
      dispatch(me())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
