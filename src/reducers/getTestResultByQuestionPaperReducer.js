import * as types from './../constants/actionTypes';
const initialState = {
  fetchingGetTestResult: false,
  fetchedGetTestResult: false,
  fetchingGetTestResultError: null,
  getTestResultData: []
}
export const getTestResultByQuestionPaperReducer = (state = initialState , action) => {
  //console.log(action);
  switch(action.type) {
    case types.GET_TEST_RESULT_BY_QUESTION_PAPER_LIST_START:
      return {
        ...state, fetchingGetTestResult: true
      };
    case types.GET_TEST_RESULT_BY_QUESTION_PAPER_LIST_FAILURE:
      return {
        ...state, fetchingGetTestResult: false, fetchingGetTestResultError: action.payload
      };
    case types.GET_TEST_RESULT_BY_QUESTION_PAPER_LIST_SUCCESS:
      return {
        ...state,
        fetchingGetTestResult: false,
        fetchedGetTestResult: true,
        getTestResultData: action.payload
      };
    default:
      return state;
  }
}