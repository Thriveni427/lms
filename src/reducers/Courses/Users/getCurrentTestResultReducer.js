import * as types from './../../../constants/actionTypes';
const initialState = {
  fetchingGetCurrentTestResult: false,
  fetchedGetCurrentTestResult: false,
  fetchingGetCurrentTestResultError: null,
  getCurrentTestResultData: []
}
export const getCurrentTestResultReducer = (state = initialState , action) => {
  //console.log(action);
  switch(action.type) {
    case types.GET_CURRENT_TEST_RESULT_START:
      return {
        ...state, fetchingGetCurrentTestResult: true
      };
    case types.GET_TEST_RESULT_BY_COURSE_FAILURE:
      return {
        ...state, fetchingGetCurrentTestResult: false, fetchingGetCurrentTestResultError: action.payload
      };
    case types.GET_CURRENT_TEST_RESULT_SUCCESS:
      return {
        ...state,
        fetchingGetCurrentTestResult: false,
        fetchedGetCurrentTestResult: true,
        getCurrentTestResultData: action.payload
      };
    default:
      return state;
  }
}