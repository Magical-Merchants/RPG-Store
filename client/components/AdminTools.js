import React from 'react'
import {connect} from 'react-redux'
import AllUsers from './AllUsers'

/**
 * COMPONENT
 */
export const AdminTools = (props) => {
  //   const {username} = props
  // TODO: reducer file with thunk for users, attach token in thunk

  return (
    <div>
      <h3>Hello World</h3>
      <AllUsers />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // username: state.auth.username,
  }
}

export default connect(mapState)(AdminTools)
