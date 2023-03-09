import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export const Home = (props) => {
  const firstName = props.firstName ? props.firstName : 'guest'
  const lastName = props.lastName ? props.lastName : ''

  console.log(props)

  return (
    <div>
      <h3 className="pageheader">Greetings, {`${firstName} ${lastName}`}</h3>
      {(!props.firstName && !props.lastName) && <Link to='/login'>Sign in to access your account. </Link>}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    firstName: state.auth.firstName,
    lastName: state.auth.lastName,
  }
}

export default connect(mapState)(Home)
