import * as types from './../constants/actionTypes';
const initialState = {
  fetchingVendors: false,
  fetchedVendors: false,
  fetchingVendorsError: null,
  vendorsData: []
}
export const getVendorReducer = (state = initialState , action) => {
  //console.log(action);
  switch(action.type) {
    case types.GET_VENDOR_DETAILS_START:
      return {
        ...state, fetchingVendors: true
      };
    case types.GET_VENDOR_DETAILS_FAILURE:
      return {
        ...state, fetchingVendors: false, fetchingVendorsError: action.payload
      };
    case types.GET_VENDOR_DETAILS_SUCCESS:
      return {
        ...state,
        fetchingVendors: false,
        fetchedVendors: true,
        vendorsData: action.payload
      };
    default:
      return state;
  }
}
