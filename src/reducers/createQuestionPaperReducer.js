import * as types from './../constants/actionTypes';
const initialState = {
  creatingQuestionPaper: false,
  createdQuestionPaper: false,
  creatingQuestionPaperError: null,
  createQuestionPaperData: []
}
export const createQuestionPaperReducer = (state = initialState , action) => {
  //console.log(action);
  switch(action.type) {
    case types.CREATE_QUESTION_PAPER_START:
      return {
        ...state, creatingQuestionPaper: true
      };
    case types.CREATE_QUESTION_PAPER_FAILURE:
      return {
        ...state, creatingQuestionPaper: false, creatingQuestionPaperError: action.payload
      };
    case types.CREATE_QUESTION_PAPER_SUCCESS:
      return {
        ...state,
        creatingQuestionPaper: false,
        createdQuestionPaper: true,
        createQuestionPaperData: action.payload
      };
    default:
      return state;
  }
}