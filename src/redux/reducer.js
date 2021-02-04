//initial State
const initialState = {
  email: '',
  user_id: '',
  admin: null,
  approved: false,
  prop_id: 0
}

//action constants
const LOGIN_USER = 'LOGIN_USER';
const LOGOUT = 'LOGOUT'

//action creators
export function loginUser(email, user_id, admin, approved, prop_id) {
  return {
    type: LOGIN_USER,
    payload: { email, user_id, admin, approved, prop_id }
  };
};

export function logout() {
  return {
    type: LOGOUT
  }
}

//reducer function
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, email: action.payload.email, user_id: action.payload.user_id, admin: action.payload.admin, approved: action.payload.approved, prop_id: action.payload.prop_id }
    case LOGOUT:
      return initialState
    default:
      return state
  }
}