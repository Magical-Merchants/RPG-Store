import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getProducts } from "../store/products";
import { addToCart } from "../store/cart";
import AddProduct from './AddProduct'

class AllProducts extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      products: this.props.products || []
    }
    this.filterProducts = this.filterProducts.bind(this);
  }
  
  componentDidMount() {
      this.props.getProducts()
  }
  
  componentDidUpdate(previousProps) {
    if (previousProps.products !== this.props.products) {
      this.setState({
        products: this.props.products
      })
    }
  }
  
  filterProducts(category) {
    if (category === "all") {
       this.setState({
        products: this.props.products
      })
    }
    else {
       this.setState({
        products: this.props.products.filter(product => product.category === category)
      })
    }
  }
  
  render() {
    const {isAdmin} = this.props
    let products = this.state.products
    
    return (

      <div>
        <h2>Products</h2>

        {isAdmin && <AddProduct />}
        
        <label>Sort by Category</label>
        <select onChange={(event) => this.filterProducts(event.target.value)}>
          <option value="all">All</option>
          <option value="potions">Potions</option>
          <option value="fashion">Fashion</option>
          <option value="weapons">Weapons</option>
          <option value="crystals">Crystals</option>
          <option value="books">Books</option>
        </select>
        
        {products.map((product) => (
          <div key={product.id}>
            <Link to={`/products/${product.id}`}>
              <h3>{product.title}</h3>
            </Link>

            <div>
              <Link to={`/products/${product.id}`}>
                <p>Price: ${product.price}</p>
              </Link>

              <Link to={`/products/${product.id}`}>
                <p>In stock: {product.inventoryQty}</p>
              </Link>

              {isAdmin && (
                <Link to={`/products/${product.id}/update`}>
                  <button type="button">Update Product</button>
                </Link>
              )}
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
