import * as types from '../constants/actionTypes';
const initialState = {
  gettingBatchById: false,
  gotBatchById: false,
  gettingBatchByIdError: null,
  gotBatchByIdData: []
}
export const getBatchByIdReducer = (state = initialState , action) => {
  //console.log(action);
  switch(action.type) {
    case types.GET_BATCH_LIST_BY_ID_START:
      return {
        ...state, gettingBatchById: true
      };
    case types.GET_BATCH_LIST_BY_ID_FAILURE:
      return {
        ...state, gettingBatchById: false, gettingBatchByIdError: action.payload
      };
    case types.GET_BATCH_LIST_BY_ID_SUCCESS:
      return {
        ...state,
        gettingBatchById: false,
        gotBatchById: true,
        gotBatchByIdData: action.payload
      };
    default:
      return state;
  }
}