import * as types from '../constants/actionTypes';
const initialState = {
  fetchingQuestion: false,
  fetchedQuestion: false,
  fetchingQuestionError: null,
  QuestionData: []
}
export const getQuestionListReducer = (state = initialState , action) => {
  //console.log(action);
  switch(action.type) {
    case types.GET_QUESTION_LIST_START:
      return {
        ...state, fetchingQuestion: true
      };
    case types.GET_QUESTION_LIST_FAILURE:
      return {
        ...state, fetchingQuestion: false, fetchingQuestionError: action.payload
      };
    case types.GET_QUESTION_LIST_SUCCESS:
      return {
        ...state,
        fetchingQuestion: false,
        fetchedQuestion: true,
        QuestionData: action.payload
      };
    default:
      return state;
  }
}