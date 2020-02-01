import * as types from './../constants/actionTypes';
const initialState = {
  creatingQuestion: false,
  createdQuestion: false,
  creatingQuestionError: null,
  createQuestionData: []
}
export const createQuestionReducer = (state = initialState , action) => {
  //console.log(action);
  switch(action.type) {
    case types.CREATE_QUESTION_START:
      return {
        ...state, creatingQuestion: true
      };
    case types.CREATE_QUESTION_FAILURE:
      return {
        ...state, creatingQuestion: false, creatingQuestionError: action.payload
      };
    case types.CREATE_QUESTION_SUCCESS:
      return {
        ...state,
        creatingQuestion: false,
        createdQuestion: true,
        createQuestionData: action.payload
      };
    default:
      return state;
  }
}