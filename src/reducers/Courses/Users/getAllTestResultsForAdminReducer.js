import * as types from './../../../constants/actionTypes';
const initialState = {
  fetchingAllTestResultsForAdmin: false,
  fetchedTestResultsForAdmin: false,
  fetchingTestResultsForAdminError: null,
  allTestResultsForAdminData: []
}
export const getAllTestResultsForAdminReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case types.GET_ALL_TEST_RESULTS_FOR_ADMIN_START:
      return {
        ...state, fetchingAllTestResultsForAdmin: true
      };
    case types.GET_ALL_TEST_RESULTS_FOR_ADMIN_FAILURE:
      return {
        ...state, fetchingAllTestResultsForAdmin: false, fetchingTestResultsForAdminError: action.payload
      };
    case types.GET_ALL_TEST_RESULTS_FOR_ADMIN_SUCCESS:
      return {
        ...state,
        fetchingAllTestResultsForAdmin: false,
        fetchedTestResultsForAdmin: true,
        allTestResultsForAdminData: action.payload
      };
    default:
      return state;
  }
}