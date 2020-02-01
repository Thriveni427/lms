import * as types from '../../constants/actionTypes';
const initialState = {
  startingTest: false,
  startedTest: false,
  startingTestError: null,
  startTestData: []
}
export const startTestReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
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
      console.log("Inside startTestReducer : Success");
      console.log(action.payload);
      return {
        ...state,
        startingTest: false,
        startedTest: true,
        startTestData: action.payload
      };
    default:
      return state;
  }
}
