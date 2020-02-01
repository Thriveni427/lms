import * as types from './../constants/actionTypes';
const initialState = {
  creatingQuestionMcq: false,
  createdQuestionMcq: false,
  creatingQuestionMcqError: null,
  createQuestionMcqData: []
}
export const createQuestionMcqReducer = (state = initialState , action) => {
  //console.log(action);
  switch(action.type) {
    case types.CREATE_QUESTION_MCQ_START:
      return {
        ...state, creatingQuestionMcq: true
      };
    case types.CREATE_QUESTION_MCQ_FAILURE:
      return {
        ...state, creatingQuestionMcq: false, creatingQuestionMcqError: action.payload
      };
    case types.CREATE_QUESTION_MCQ_SUCCESS:
      return {
        ...state,
        creatingQuestionMcq: false,
        createdQuestionMcq: true,
        createQuestionMcqData: action.payload
      };
    default:
      return state;
  }
}