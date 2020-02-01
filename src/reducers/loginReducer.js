import * as types from './../constants/actionTypes';
const initialState = {
  loginAuthernticating: false,
  loginAuthenticated: false,
  loginAuthError: null,
  loginAuth: false
}
export const loginReducer = (state = initialState , action) => {
  console.log(action);
  switch(action.type) {
    case types.LOGIN_REQUEST:
      return {
        ...state,
        loginAuthernticating: true
      };
    case types.LOGIN_FAILURE:
      return {
        ...state,
        loginAuthernticating: false,
        loginAuthError: action.payload
      };
    case types.LOGIN_SUCCESS:
      sessionStorage.setItem("loginAuth", true)
      sessionStorage.setItem("userinfo", JSON.stringify(action.payload))
      return {
        ...state,
        loginAuthernticating: false,
        loginAuthenticated: true,
        loginAuth: action.payload
      };
    default:
      return state;
  }
}