import * as types from './../constants/actionTypes';
const initialState = {
  editingQuestionPaper: false,
  editedQuestionPaper: false,
  editingQuestionPaperError: null,
  editQuestionPaperData: []
}
export const editQuestionPaperReducer = (state = initialState , action) => {
  console.log(action);
  switch(action.type) {
    case types.EDIT_QUESTION_PAPER_START:
      return {
        ...state, editingQuestionPaper: true, editedQuestionPaper: false
      };
    case types.EDIT_QUESTION_PAPER_FAILURE:
      return {
        ...state, editingQuestionPaper: false, editingQuestionPaperError: action.payload
      };
    case types.EDIT_QUESTION_PAPER_SUCCESS:
      return {
        ...state,
        editingQuestionPaper: false,
        editedQuestionPaper: true,
        editQuestionPaperData: action.payload
      };
    default:
      return state;
  }
}