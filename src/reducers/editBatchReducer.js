import * as types from './../constants/actionTypes';
const initialState = {
  editBatch: false,
  editedBatch: false,
  editBatchError: null,
  editBatchData:""
}
export const editBatchReducer = (state = initialState , action) => {
  console.log(action);
  switch(action.type) {
    case types.EDIT_BATCH_START:
      return {
        ...state, editBatch: true
      };
    case types.EDIT_BATCH_FAILURE:
      return {
        ...state, editBatch: false, editBatchError: action.payload
      };
    case types.EDIT_BATCH_SUCCESS:
      return {
        ...state,
        editBatch: false,
        editedBatch: true,
        editBatchData: action.payload
      };
    default:
      return state;
  }
}