import * as types from './../constants/actionTypes';
const initialState = {
  editVendors: false,
  editedVendors: false,
  editVendorsError: null,
  editvendorsData:""
}
export const editVendorReducer = (state = initialState , action) => {
  //console.log(action);
  switch(action.type) {
    case types.EDIT_VENDOR_DETAILS_START:
      return {
        ...state, editVendors: true
      };
    case types.EDIT_VENDOR_DETAILS_FAILURE:
      return {
        ...state, editVendors: false, editVendorsError: action.payload
      };
    case types.EDIT_VENDOR_DETAILS_SUCCESS:
      return {
        ...state,
        editVendors: false,
        editedVendors: true,
        editvendorsData: action.payload
      };
    default:
      return state;
  }
}
