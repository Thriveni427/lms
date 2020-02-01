import * as types from './../constants/actionTypes';
const initialState = {
  startingTest: false,
  startedTest: false,
  startingTestError: null,
  testData: []
}
export const startTestReducer = (state = initialState , action) => {
  //console.log(action);
  switch(action.type) {
    case types.START_TEST_START:
      return {
        ...state,
        startingTest: true
      };
    case types.START_TEST_FAILURE:
      return {
        ...state,
        startingTest: false,
        startingTestError: action.payload
      };
    case types.START_TEST_SUCCESS:
      return {
        ...state,
        startingTest: false,
        startedTest: true,
        testData: action.payload
      };
    default:
      return state;
  }
}