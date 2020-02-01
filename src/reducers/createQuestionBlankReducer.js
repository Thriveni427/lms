import * as types from './../constants/actionTypes';
const initialState = {
  creatingQuestionBlank: false,
  createdQuestionBlank: false,
  creatingQuestionBlankError: null,
  createQuestionBlankData: []
}
export const createQuestionBlankReducer = (state = initialState , action) => {
  //console.log(action);
  switch(action.type) {
    case types.CREATE_QUESTION_BLANK_START:
      return {
        ...state, creatingQuestionBlank: true
      };
    case types.CREATE_QUESTION_BLANK_FAILURE:
      return {
        ...state, creatingQuestionBlank: false, creatingQuestionBlankError: action.payload
      };
    case types.CREATE_QUESTION_BLANK_SUCCESS:
      return {
        ...state,
        creatingQuestionBlank: false,
        createdQuestionBlank: true,
        createQuestionBlankData: action.payload
      };
    default:
      return state;
  }
}