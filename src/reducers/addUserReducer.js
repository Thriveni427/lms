import * as types from './../constants/actionTypes';
const initialState = {
  addingUser: false,
  addedUser: false,
  addingUserError: null,
  addUserData: []
}
export const addUserReducer = (state = initialState , action) => {
  //console.log(action);
  switch(action.type) {
    case types.ADD_USER_START:
      return {
        ...state, addingUser: true
      };
    case types.ADD_USER_FAILURE:
      return {
        ...state, addingUser: false, addingUserError: action.payload
      };
    case types.ADD_USER_SUCCESS:
      return {
        ...state,
        addingUser: false,
        addedUser: true,
        addUserData: action.payload
      };
    default:
      return state;
  }
}