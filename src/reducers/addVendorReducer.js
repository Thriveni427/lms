import * as types from './../constants/actionTypes';
const initialState = {
  addingVendor: false,
  addedVendor: false,
  addingVendorError: null,
  addVendorData: []
}
export const addVendorReducer = (state = initialState , action) => {
  //console.log(action);
  switch(action.type) {
    case types.ADD_VENDOR_START:
      return {
        ...state, addingVendor: true
      };
    case types.ADD_VENDOR_FAILURE:
      return {
        ...state, addingVendor: false, addingVendorError: action.payload
      };
    case types.ADD_VENDOR_SUCCESS:
      return {
        ...state,
        addingVendor: false,
        addedVendor: true,
        addVendorData: action.payload
      };
    default:
      return state;
  }
}