import * as types from './../constants/actionTypes';
const initialState = {
  fetchingQuestionBank: false,
  fetchedQuestionBank: false,
  fetchingQuestionBankError: null,
  QuestionBankData: []
}
export const getQuestionBankListReducer = (state = initialState , action) => {
  console.log(action);
  switch(action.type) {
    case types.GET_QUESTION_BANK_LIST_START:
      return {
        ...state, fetchingQuestionBank: true
      };
    case types.GET_QUESTION_BANK_LIST_FAILURE:
      return {
        ...state, fetchingQuestionBank: false, fetchingQuestionBankError: action.payload
      };
    case types.GET_QUESTION_BANK_LIST_SUCCESS:
      return {
        ...state,
        fetchingQuestionBank: false,
        fetchedQuestionBank: true,
        QuestionBankData: action.payload
      };
    default:
      return state;
  }
}