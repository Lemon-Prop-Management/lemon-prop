//initial State
const initialState = {
  user_id: '',
  email: '',
  admin: null,
  approved: false
}

//action constants
const LOGIN_USER = 'LOGIN_USER';
const LOGOUT = 'LOGOUT'

//action creators
export function loginUser(email, user_id, admin, approved) {
  console.log(email, user_id, admin, approved)
  return {
    type: LOGIN_USER,
    payload: { email, user_id, admin, approved }
  };
};

export function logout() {
  return {
    type: LOGOUT
  }
}

//reducer function
export default function reducer(state = initialState, action) {
  console.log(action.payload)
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, email: action.payload.email, user_id: action.payload.user_id, admin: action.payload.admin, approved: action.payload.approved }
    case LOGOUT:
      return initialState
    default:
      return state
  }
}