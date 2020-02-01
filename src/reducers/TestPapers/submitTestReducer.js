import * as types from '../../constants/actionTypes';
const initialState = {
  submittingTest: false,
  submittedTest: false,
  submittingTestError: null,
  submitTestData: []
}
export const submitTestReducer = (state = initialState , action) => {
  console.log(action);
  switch(action.type) {
    case types.SUBMIT_TEST_START:
      return {
        ...state,
        submittingTest: true
      };
    case types.SUBMIT_TEST_FAILURE:
      console.log("submit test failure");
      
      return {
        ...state,
        submittingTest: false,
        submittingTestError: action.payload
      };
    case types.SUBMIT_TEST_SUCCESS:
      console.log("Inside startTestReducer : Success");
      console.log(action.payload);      
      return {
        ...state,
        submittingTest: false,
        submittedTest: true,
        submitTestData: action.payload
      };
    default:
      return state;
  }
}
