import * as types from './../constants/actionTypes';
const initialState = {
  bulkUploading: false,
  bulkUploaded: false,
  bulkUploadingError: null,
  bulkUploadData: []
}
export const bulkUploadReducer = (state = initialState , action) => {
  //console.log(action);
  switch(action.type) {
    case types.BULK_UPLOAD_START:
      return {
        ...state, bulkUploading: true
      };
    case types.BULK_UPLOAD_FAILURE:
      return {
        ...state, bulkUploading: false, bulkUploadingError: action.payload
      };
    case types.BULK_UPLOAD_SUCCESS:
      return {
        ...state,
        bulkUploading: false,
        bulkUploaded: true,
        bulkUploadData: action.payload
      };
    default:
      return state;
  }
}