import React from 'react'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const AdminTools = (props) => {
//   const {username} = props

  return (
    <div>
      <h3>Hello World</h3>
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