import * as types from './../constants/actionTypes';
const initialState = {
  creatingCourse: false,
  createdCourse: false,
  creatingCourseError: null,
  createCourseData: []
}
export const createCourseReducer = (state = initialState , action) => {
  //console.log(action);
  switch(action.type) {
    case types.CREATE_COURSE_START:
      return {
        ...state, creatingCourse: true
      };
    case types.CREATE_COURSE_FAILURE:
      return {
        ...state, creatingCourse: false, creatingCourseError: action.payload
      };
    case types.CREATE_COURSE_SUCCESS:
      return {
        ...state,
        creatingCourse: false,
        createdCourse: true,
        createCourseData: action.payload
      };
    default:
      return state;
  }
}