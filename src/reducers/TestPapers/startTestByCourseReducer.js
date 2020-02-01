import * as types from '../../constants/actionTypes';
const initialState = {
  startingTestByCourse: false,
  startedTestByCourse: false,
  startingTestByCourseError: null,
  startTestByCourseData: []
}
export const startTestByCourseReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case types.START_TEST_BY_COURSE_START:
      return {
        ...state,
        startingTestByCourse: true
      };
    case types.START_TEST_BY_COURSE_FAILURE:
      return {
        ...state,
        startingTestByCourse: false,
        startingTestByCourseError: action.payload
      };
    case types.START_TEST_BY_COURSE_SUCCESS:
      console.log("Inside startTestByCourseReducers : Success");
      console.log(action.payload);
      return {
        ...state,
        startingTestByCourse: false,
        startedTestByCourse: true,
        startTestByCourseData: action.payload
      };
    default:
      return state;
  }
}
