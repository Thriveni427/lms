import * as types from './../constants/actionTypes';
const initialState = {
  fetchingBatches: false,
  fetchedBatches: false,
  fetchingBatchesError: null,
  batchData: []
}
export const getBatchListReducer = (state = initialState , action) => {
  //console.log(action);
  switch(action.type) {
    case types.GET_BATCH_LIST_START:
      return {
        ...state, fetchingBatches: true
      };
    case types.GET_BATCH_LIST_FAILURE:
      return {
        ...state, fetchingBatches: false, fetchingBatchesError: action.payload
      };
    case types.GET_BATCH_LIST_SUCCESS:
      return {
        ...state,
        fetchingBatches: false,
        fetchedBatches: true,
        batchData: action.payload
      };
    default:
      return state;
  }
}