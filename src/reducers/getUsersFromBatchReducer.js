import * as types from './../constants/actionTypes';
const initialState = {
  gettingUsersFromBatch: false,
  gotUsersFromBatch: false,
  gettingUsersFromBatchError: null,
  gotUsersFromBatchData: []
}
export const getUsersFromBatchReducer = (state = initialState , action) => {
  //console.log(action);
  switch(action.type) {
    case types.GET_USERS_FROM_BATCH_START:
      return {
        ...state, gettingUsersFromBatch: true
      };
    case types.GET_USERS_FROM_BATCH_FAILURE:
      return {
        ...state, gettingUsersFromBatch: false, gettingUsersFromBatchError: action.payload
      };
    case types.GET_USERS_FROM_BATCH_SUCCESS:
      return {
        ...state,
        gettingUsersFromBatch: false,
        gotUsersFromBatch: true,
        gotUsersFromBatchData: action.payload
      };
    default:
      return state;
  }
}