import axios from 'axios'
const TOKEN = 'token'

// initalState:
const initalState = {users: []}
// action type:
const GOT_USERS = 'GOT_USERS'

// action creators:
const gotAllUsers = (users) => ({type: GOT_USERS, users})

// thunk creators:
export const getUsers = () => {
  const token = window.localStorage.getItem(TOKEN)
  return async (dispatch) => {
    try {
      const {data} = await axios.get('/api/users/', {
        headers: {
          authorization: token,
        },
      })
      dispatch(gotAllUsers(data))
    } catch (error) {
      console.error(error)
    }
  }
}

// reducer:
export default function usersReducer(state = initalState, action) {
  switch (action.type) {
    case GOT_USERS:
      return {...state, users: action.users}
    default:
      return state
  }
}
