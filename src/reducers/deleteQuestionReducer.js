import * as types from './../constants/actionTypes';
const initialState = {
  deleteQuestion: false,
  deletedQuestion: false,
  deleteQuestionError: null,
  deleteQuestionData:""
}
export const deleteQuestionReducer = (state = initialState , action) => {
  console.log(action);
  switch(action.type) {
    case types.DELETE_QUESTION_START:
      return {
        ...state, deleteQuestion: true
      };
    case types.DELETE_QUESTION_FAILURE:
      return {
        ...state, deleteQuestion: false, deleteQuestionError: action.payload
      };
    case types.DELETE_QUESTION_SUCCESS:
      return {
        ...state,
        deleteQuestion: false,
        deletedQuestion: true,
        deleteQuestionData: action.payload
      };
    default:
      return state;
  }
}