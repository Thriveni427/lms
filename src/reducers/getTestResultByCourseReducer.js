import * as types from './../constants/actionTypes';
const initialState = {
  fetchingGetTestCourseResult: false,
  fetchedGetTestCourseResult: false,
  fetchingGetTestCourseResultError: null,
  getTestCourseResultData: []
}
export const getTestResultByCourseReducer = (state = initialState , action) => {
  //console.log(action);
  switch(action.type) {
    case types.GET_TEST_RESULT_BY_COURSE_START:
      return {
        ...state, fetchingGetTestCourseResult: true
      };
    case types.GET_TEST_RESULT_BY_COURSE_FAILURE:
      return {
        ...state, fetchingGetTestCourseResult: false, fetchingGetTestCourseResultError: action.payload
      };
    case types.GET_TEST_RESULT_BY_COURSE_SUCCESS:
      return {
        ...state,
        fetchingGetTestCourseResult: false,
        fetchedGetTestCourseResult: true,
        getTestCourseResultData: action.payload
      };
    default:
      return state;
  }
}