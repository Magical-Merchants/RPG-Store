import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getUsers} from '../store/users'

class AllUsers extends Component {
  componentDidMount() {
    this.props.getUsers()
  }

  render() {
    return (
      <div>
        <h3>Let's test viewing all the users...</h3>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    users: state.users.allUsers,
  }
}

const mapDispatch = (dispatch) => {
  return {
    getUsers: () => {
      dispatch(getUsers())
    },
  }
}

export default connect(mapState, mapDispatch)(AllUsers)

// export default AllUsers
