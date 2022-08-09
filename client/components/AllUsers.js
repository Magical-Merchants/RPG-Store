import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getUsers} from '../store/users'

class AllUsers extends Component {
  componentDidMount() {
    this.props.getUsers()
  }

  render() {
    const users = this.props.users
    
    return (
      <div>
        <h2>Users</h2>
        {users.map(user => {
          return (
          <div key={user.id}>
          {user.id}: {user.username}
          </div>
          )
        })}
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    users: state.users.users,
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
