import * as types from './../constants/actionTypes';
const initialState = {
    creatingBatch: false,
    createdBatch: false,
    creatingBatchError: null,
    createBatchData: []
}
export const createBatchReducer = (state = initialState , action) => {
  //console.log(action);
  switch(action.type) {
    case types.CREATE_BATCH_START:
      return {
        ...state, creatingBatch: true
      };
    case types.CREATE_BATCH_FAILURE:
      return {
        ...state, creatingBatch: false, creatingBatchError: action.payload
      };
    case types.CREATE_BATCH_SUCCESS:
      return {
        ...state,
        creatingBatch: false,
        createdBatch: true,
        createBatchData: action.payload
      };
    default:
      return state;
  }
}
