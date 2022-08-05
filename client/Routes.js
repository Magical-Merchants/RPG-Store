import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import {Login, Signup} from './components/AuthForm'
import Home from './components/Home'
import AdminTools from './components/AdminTools'
import AllProducts from './components/AllProducts'
import SingleProduct from './components/SingleProduct'
import Cart from './components/Cart'
import OrderHistory from './components/OrderHistory'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props
    return (
      <div>
        {/* TODO: have one switch statement, only show certain routes if user is logged in. This was our attempt to refactor: */}

        {/* <Switch>
          {isAdmin && <Route path="/admin-tools" component={AdminTools} />}
          {!isLoggedIn && <Route path="/" exact component={Login} />}
          {!isLoggedIn && <Route path="/login" component={Login} />}
          {!isLoggedIn && <Route path="/signup" component={Signup} />}

          <Route path="/home" component={Home} />
          <Route exact path="/products" component={AllProducts} />
          <Route path="/products/:id" component={SingleProduct} />
          <Route path="/cart" component={Cart} />
          <Redirect to="/home" />
        </Switch> */}

        {/* TODO: Change "Redirect" to a 404 */}

        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/admin-tools" component={AdminTools} />
            <Route exact path="/products" component={AllProducts} />
            <Route path="/products/:id" component={SingleProduct} />
            <Route path="/cart" component={Cart} />
            <Route path="/order-history" component={OrderHistory} />
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route exact path="/products" component={AllProducts} />
            <Route path="/products/:id" component={SingleProduct} />
            <Route path="/cart" component={Cart} />
            <Route path="/order-history" component={OrderHistory} />
          </Switch>
        )}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    isAdmin: state.auth.isAdmin,
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me())
    },
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))
