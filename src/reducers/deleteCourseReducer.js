import * as types from './../constants/actionTypes';
const initialState = {
  deleteCourse: false,
  deletedCourse: false,
  deleteCourseError: null,
  deleteCourseData:""
}
export const deleteCourseReducer = (state = initialState , action) => {
  console.log(action);
  switch(action.type) {
    case types.DELETE_COURSE_START:
      return {
        ...state, deleteCourse: true
      };
    case types.DELETE_COURSE_FAILURE:
      return {
        ...state, deleteCourse: false, deleteCourseError: action.payload
      };
    case types.DELETE_COURSE_SUCCESS:
      return {
        ...state,
        deleteCourse: false,
        deletedCourse: true,
        deleteCourseData: action.payload
      };
    default:
      return state;
  }
}