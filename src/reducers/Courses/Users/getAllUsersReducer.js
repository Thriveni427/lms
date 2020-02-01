import * as types from './../../../constants/actionTypes';
const initialState = {
  fetchingAllUsers: false,
  fetchedAllUsers: false,
  fetchingAllUsersError: null,
  allUsersData: []
}
export const getAllUsersReducer = (state = initialState , action) => {
  //console.log(action);
  switch(action.type) {
    case types.GET_ALL_USERS_START:
      return {
        ...state, fetchingAllUsers: true
      };
    case types.GET_ALL_USERS_FAILURE:
      return {
        ...state, fetchingAllUsers: false, fetchingAllUsersError: action.payload
      };
    case types.GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        fetchingAllUsers: false,
        fetchedAllUsers: true,
        allUsersData: action.payload
      };
    default:
      return state;
  }
}