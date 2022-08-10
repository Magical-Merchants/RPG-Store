import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getProducts} from '../store/products'
import {addToCart} from '../store/cart'
import AddProduct from './AddProduct'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }
  render() {
    const {isAdmin} = this.props
    return (
      <div className=".allproducts-wrapper-container">
        <div className="allproducts-wrapper-item">
          <h1 className="pageheader">Shop our wares</h1>

          {isAdmin && <AddProduct />}
        </div>
        <div className="allproducts-wrapper-item">
          <div className="allproducts-product-list-container">
            {this.props.products.map((product) => (
              <div key={product.id} className="allproducts-product-list-item">
                <div className="allproducts-individual-product-container">
                  <Link to={`/products/${product.id}`}>
                    <h3>{product.title}</h3>
                  </Link>
                  <Link to={`/products/${product.id}`}>
                    <img src={product.photoUrl} />
                  </Link>

                  <div className="allproducts-price-and-stock-container">
                    <span>Price: ${product.price}</span>
                    <span>In stock: {product.inventoryQty}</span>
                  </div>
                  {/* 
                  <Link to={`/products/${product.id}`}>
                    
                  </Link> */}
                  <div>
                    <button onClick={() => this.props.addToCart(product)}>
                      Add {product.title} to Cart
                    </button>
                  </div>
                  {isAdmin && (
                    <Link to={`/products/${product.id}/update`}>
                      <button type="button">Update Product</button>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* TODO: Add pagination and buttons:
        <div className=".allproducts-wrapper-item">
          <h3>Previous page & next page buttons</h3>
        </div> */}
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
      dispatch(addToCart(product))
    },
    loadInitialData() {
      dispatch(me())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
