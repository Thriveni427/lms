import * as types from "../../constants/actionTypes";
const initialState = {
  fetchingOverallCourses: false,
  fetchedOverallCourses: false,
  fetchingOverallCoursesError: null,
  OverallCoursesData: []
};
export const getOverallCoursesReducer = (state = initialState, action) => {
  //console.log(action);
  switch (action.type) {
    case types.GET_COURSE_COUNT_START:
      return {
        ...state,
        fetchingOverallCourses: true
      };
    case types.GET_COURSE_COUNT_FAILURE:
      return {
        ...state,
        fetchingOverallCourses: false,
        fetchingOverallCoursesError: action.payload
      };
    case types.GET_COURSE_COUNT_SUCCESS:
      console.log("Inside getOverallCoursesReducer : Success");
      console.log(action.payload);
      return {
        ...state,
        fetchingOverallCourses: false,
        fetchedOverallCourses: true,
        OverallCoursesData: action.payload
      };
    default:
      return state;
  }
};
