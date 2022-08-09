import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getSingleProduct} from '../store/products'

class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.getSingleProduct(this.props.match.params.id)
  }

  render() {
    const {isAdmin} = this.props
    const product = this.props.product
    return (
      <div className="single-product">
        <h3> {product.title} </h3>
        {isAdmin && (
          <Link to={`/products/${product.id}/update`}>
            <button type="button">Update product</button>
          </Link>
        )}

        <p>Description: {product.description}</p>
        <p>Price: {product.price}</p>
        <p>In stock: {product.inventoryQty}</p>

        <img src={product.photoUrl} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    product: state.products.singleProduct,
    isAdmin: state.auth.isAdmin,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSingleProduct: (id) => {
      dispatch(getSingleProduct(id))
    },
    loadInitialData() {
      dispatch(me())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
