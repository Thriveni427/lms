import * as types from './../constants/actionTypes';
const initialState = {
  fetchingCourses: false,
  fetchedCourses: false,
  fetchingCoursesError: null,
  coursesData: []
}
export const getCourseListReducer = (state = initialState , action) => {
  //console.log(action);
  switch(action.type) {
    case types.GET_COURSE_LIST_START:
      return {
        ...state, fetchingCourses: true
      };
    case types.GET_COURSE_LIST_FAILURE:
      return {
        ...state, fetchingCourses: false, fetchingCoursesError: action.payload
      };
    case types.GET_COURSE_LIST_SUCCESS:
      return {
        ...state,
        fetchingCourses: false,
        fetchedCourses: true,
        coursesData: action.payload
      };
    default:
      return state;
  }
}
