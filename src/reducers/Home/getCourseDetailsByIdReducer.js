import * as types from "../../constants/actionTypes";
const initialState = {
  fetchingCourseDetails: false,
  fetchedCourseDetails: false,
  fetchingCourseDetailsError: null,
  CourseDetailsData: []
};
export const getCourseDetailsByIdReducer = (state = initialState, action) => {
  //console.log(action);
  switch (action.type) {
    case types.GET_COURSE_DETAILS_START:
      return {
        ...state,
        fetchingCourseDetails: true
      };
    case types.GET_COURSE_DETAILS_FAILURE:
      return {
        ...state,
        fetchingCourseDetails: false,
        fetchingCourseDetailsError: action.payload
      };
    case types.GET_COURSE_DETAILS_SUCCESS:
      console.log("Inside getLearningPathReducer : Success");
      console.log(action.payload);
      return {
        ...state,
        fetchingCourseDetails: false,
        fetchedCourseDetails: true,
        CourseDetailsData: action.payload
      };
    default:
      return state;
  }
};
