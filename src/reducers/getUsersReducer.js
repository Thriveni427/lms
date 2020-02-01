import * as types from './../constants/actionTypes';
const initialState = {
  fetchingUsers: false,
  fetchedUsers: false,
  fetchingUsersError: null,
  usersData: []
}
export const getUsersReducer = (state = initialState , action) => {
  //console.log(action);
  switch(action.type) {
    case types.GET_USER_DETAILS_START:
      return {
        ...state, fetchingUsers: true
      };
    case types.GET_USER_DETAILS_FAILURE:
      return {
        ...state, fetchingUsers: false, fetchingUsersError: action.payload
      };
    case types.GET_USER_DETAILS_SUCCESS:
      return {
        ...state,
        fetchingUsers: false,
        fetchedUsers: true,
        usersData: action.payload
      };
    default:
      return state;
  }
}