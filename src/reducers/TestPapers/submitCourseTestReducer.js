import * as types from '../../constants/actionTypes';
const initialState = {
  submittingCourseTest: false,
  submittedCourseTest: false,
  submittingCourseTestError: null,
  submitCourseTestData: []
}
export const submitCourseTestReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case types.COURSE_SUBMIT_TEST_START:
      return {
        ...state,
        submittingCourseTest: true
      };
    case types.COURSE_SUBMIT_TEST_FAILURE:
      return {
        ...state,
        submittingCourseTest: false,
        submittingCourseTestError: action.payload
      };
    case types.COURSE_SUBMIT_TEST_SUCCESS:
      console.log("Inside submitCourseTestReducer : Success");
      console.log(action.payload);
      return {
        ...state,
        submittingCourseTest: false,
        submittedCourseTest: true,
        submitCourseTestData: action.payload
      };
    default:
      return state;
  }
}
