import * as types from '../constants/actionTypes';
const initialState = {
  userRegistering: false,
  userRegistered: false,
  userRegisterError: null,
  userRegister: false
}
export const guestUserRegistrationReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case types.REGISTER_START:
      return {
        ...state,
        userRegistering: true
      };
    case types.REGISTER_FAILURE:
      return {
        ...state,
        userRegistering: false,
        userRegisterError: action.payload
      };
    case types.REGISTER_SUCCESS:
      sessionStorage.setItem("loginAuth", true)
      sessionStorage.setItem("userinfo", JSON.stringify(action.payload))
      return {
        ...state,
        userRegistering: false,
        userRegistered: true,
        userRegister: action.payload
      };
    default:
      return state;
  }
}