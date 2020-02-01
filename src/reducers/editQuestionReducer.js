import * as types from './../constants/actionTypes';
const initialState = {
  editingQuestion: false,
  editedQuestion: false,
  editQuestionError: null,
  editQuestionData:"",
  showMcq: false,
  showEssay: false,
  showFillBlanks: false,
  showTrueFalse: false,
  showMatch: false
}

export const editQuestionReducer = (state = initialState , action) => {
  console.log(action);
  switch(action.type) {
    case types.SHOW_MCQ:
    return {
        ...state,
        showMcq: true,
        showEssay: false,
        showFillBlanks: false,
        showTrueFalse: false,
        showMatch: false
    };
    case types.SHOW_ESSAY:
      return {
        ...state,
        showMcq: false,
        showEssay: true,
        showFillBlanks: false,
        showTrueFalse: false,
        showMatch: false
      };
    case types.SHOW_FILL_BLANK:
      return {
        ...state,
        showMcq: false,
        showEssay: false,
        showFillBlanks: true,
        showTrueFalse: false,
        showMatch: false
      };
    case types.SHOW_TRUE_FALSE:
      return {
        ...state,
        showMcq: false,
        showEssay: false,
        showFillBlanks: false,
        showTrueFalse: true,
        showMatch: false
      };
    case types.SHOW_MATCH:
      return {
        ...state,
        showMcq: false,
        showEssay: false,
        showFillBlanks: false,
        showTrueFalse: false,
        showMatch: true
      };
      case types.EDIT_QUESTION_START:
      return {
        ...state, editingQuestion: true
      };
    case types.EDIT_QUESTION_FAILURE:
      return {
        ...state, editingQuestion: false, editQuestionError: action.payload
      };
    case types.EDIT_QUESTION_SUCCESS:
      return {
        ...state,
        editingQuestion: false,
        editedQuestion: true,
        editQuestionData: action.payload
      };
    default:
      return state;
  }
}
