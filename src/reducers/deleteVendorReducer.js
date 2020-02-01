import * as types from './../constants/actionTypes';
const initialState = {
  deleteVendor: false,
  deletedVendor: false,
  deleteVendorError: null,
  deleteVendorData:""
}
export const deleteVendorReducer = (state = initialState , action) => {
  console.log(action);
  switch(action.type) {
    case types.DELETE_VENDOR_START:
      return {
        ...state, deleteVendor: true
      };
    case types.DELETE_VENDOR_FAILURE:
      return {
        ...state, deleteVendor: false, deleteVendorError: action.payload
      };
    case types.DELETE_VENDOR_SUCCESS:
      return {
        ...state,
        deleteVendor: false,
        deletedVendor: true,
        deleteVendorData: action.payload
      };
    default:
      return state;
  }
}