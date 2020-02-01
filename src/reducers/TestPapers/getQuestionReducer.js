import * as types from '../../constants/actionTypes';
const initialState = {
  gettingQuestions: false,
  gotQuestions: false,
  gettingQuestionsError: null,
  getQuestionsData: []
}
export const getQuestionReducer = (state = initialState , action) => {
  //console.log(action);
  switch(action.type) {
    case types.GET_QUESTION_DETAILS_START:
      return {
        ...state,
        gettingQuestions: true
      };
    case types.GET_QUESTION_DETAILS_FAILURE:
      return {
        ...state,
        gettingQuestions: false,
        gettingQuestionsError: action.payload
      };
    case types.GET_QUESTION_DETAILS_SUCCESS:
      console.log("Inside getQuestionReducer : Success");
      console.log(action.payload);      
      return {
        ...state,
        gettingQuestions: false,
        gotQuestions: true,
        getQuestionsData: action.payload
      };
    default:
      return state;
  }
}
