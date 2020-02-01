import * as types from './../constants/actionTypes';
const initialState = {
  fetchingQuestionPaper: false,
  fetchedQuestionPaper: false,
  fetchingQuestionPaperError: null,
  QuestionPaperData: [],
  QuestionPaperDataUser: []
}
export const getQuestionPaperReducer = (state = initialState , action) => {
  console.log(action);
  switch(action.type) {
    case types.GET_QUESTION_PAPER_LIST_START:
      return {
        ...state, fetchingQuestionPaper: true
      };
    case types.GET_QUESTION_PAPER_LIST_FAILURE:
      return {
        ...state, fetchingQuestionPaper: false, fetchingQuestionPaperError: action.payload
      };
    case types.GET_QUESTION_PAPER_LIST_SUCCESS:
      return {
        ...state,
        fetchingQuestionPaper: false,
        fetchedQuestionPaper: true,
        QuestionPaperData: action.payload
      };

    case types.GET_ASSIGNED_PAPER_START:
      return {
        ...state, fetchingQuestionPaper: true
      };
    case types.GET_ASSIGNED_PAPER_FAILURE:
      return {
        ...state, fetchingQuestionPaper: false,
        fetchingQuestionPaperError: action.payload
      };
    case types.GET_ASSIGNED_PAPER_SUCCESS:
      return {
        ...state,
        fetchingQuestionPaper: false,
        fetchedQuestionPaper: true,
        QuestionPaperDataUser: action.payload
      };
    default:
      return state;
  }
}
