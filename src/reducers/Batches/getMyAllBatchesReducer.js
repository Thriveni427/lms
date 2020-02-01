import * as types from './../../constants/actionTypes';
const initialState = {
  gettingAllBatches: false,
  gotAllBatches: false,
  gettingAllBatchesError: null,
  gotAllBatchesData: []
}

export const getMyAllBatchesReducer = (state = initialState, action) => {
console.log(action);

  switch (action.type) {
    case types.GET_MY_ALL_BATCHES_START:
      return {
        ...state,
        gettingAllBatches: true
      };
    case types.GET_MY_ALL_BATCHES_FAILURE:
      return {
        ...state,
        gettingAllBatches: false,
        gettingAllBatchesError: action.payload
      };
    case types.GET_MY_ALL_BATCHES_SUCCESS:
      return {
        ...state,
        gettingAllBatches: false,
        gotAllBatches: true,
        gotAllBatchesData: action.payload
      };
    default:
      return state;
  }
}
