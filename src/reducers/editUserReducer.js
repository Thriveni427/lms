import * as types from './../constants/actionTypes';
const initialState = {
  editUsers: false,
  editedUsers: false,
  editUsersError: null,
  usersData:""
}
export const editUserReducer = (state = initialState , action) => {
  //console.log(action);
  switch(action.type) {
    case types.EDIT_USER_DETAILS_START:
      return {
        ...state, editUsers: true
      };
    case types.EDIT_USER_DETAILS_FAILURE:
      return {
        ...state, editUsers: false, editUsersError: action.payload
      };
    case types.EDIT_USER_DETAILS_SUCCESS:
      return {
        ...state,
        editUsers: false,
        editedUsers: true,
        usersData: action.payload
      };
    default:
      return state;
  }
}