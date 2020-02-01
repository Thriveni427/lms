import * as types from './../constants/actionTypes';
const initialState = {
  creatingQuestionMatch: false,
  createdQuestionMatch: false,
  creatingQuestionMatchError: null,
  createQuestionMatchData: []
}
export const createQuestionMatchingReducer = (state = initialState , action) => {
  //console.log(action);
  switch(action.type) {
    case types.CREATE_QUESTION_MATCH_START:
      return {
        ...state, creatingQuestionMatch: true
      };
    case types.CREATE_QUESTION_MATCH_FAILURE:
      return {
        ...state, creatingQuestionMatch: false, creatingQuestionMatchError: action.payload
      };
    case types.CREATE_QUESTION_MATCH_SUCCESS:
      return {
        ...state,
        creatingQuestionMatch: false,
        createdQuestionMatch: true,
        createQuestionMatchData: action.payload
      };
    default:
      return state;
  }
}