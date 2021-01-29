//initial State
const initialState = {
  email: '',
  admin: null,
  approved: false
}

//action constants
const LOGIN_USER = 'LOGIN_USER';
const LOGOUT = 'LOGOUT'

//action creators
export function loginUser(email, admin, approved) {
  return {
    type: LOGIN_USER,
    payload: { email, admin, approved }
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
      return { ...state, email: action.payload.email, admin: action.payload.admin, approved: action.payload.approved }
    case LOGOUT:
      return initialState
    default:
      return state
  }
}