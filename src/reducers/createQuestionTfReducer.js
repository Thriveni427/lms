import * as types from './../constants/actionTypes';
const initialState = {
  creatingQuestionTf: false,
  createdQuestionTf: false,
  creatingQuestionTfError: null,
  createQuestionTfData: []
}
export const createQuestionTfReducer = (state = initialState , action) => {
  //console.log(action);
  switch(action.type) {
    case types.CREATE_QUESTION_TF_START:
      return {
        ...state, creatingQuestionTf: true
      };
    case types.CREATE_QUESTION_TF_FAILURE:
      return {
        ...state, creatingQuestionTf: false, creatingQuestionTfError: action.payload
      };
    case types.CREATE_QUESTION_TF_SUCCESS:
      return {
        ...state,
        creatingQuestionTf: false,
        createdQuestionTf: true,
        createQuestionTfData: action.payload
      };
    default:
      return state;
  }
}