import * as types from './../constants/actionTypes';
const initialState = {
  creatingQuestionEssay: false,
  createdQuestionEssay: false,
  creatingQuestionEssayError: null,
  createQuestionEssayData: [],
  showMcq: false,
  showEssay: false,
  showFillBlanks: false,
  showTrueFalse: false,
  showMatch: false
}
export const createQuestionEsaayReducer = (state = initialState , action) => {
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
    case types.CREATE_QUESTION_ESSAY_START:
      return {
        ...state, creatingQuestionEssay: true
      };
    case types.CREATE_QUESTION_ESSAY_FAILURE:
      return {
        ...state, creatingQuestionEssay: false, creatingQuestionEssayError: action.payload
      };
    case types.CREATE_QUESTION_ESSAY_SUCCESS:
      return {
        ...state,
        creatingQuestionEssay: false,
        createdQuestionEssay: true,
        createQuestionEssayData: action.payload
      };
    default:
      return state;
  }
}
