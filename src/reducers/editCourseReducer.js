import * as types from './../constants/actionTypes';
const initialState = {
  editingCourse: false,
  editedCourse: false,
  editingCourseError: null,
  editCourseData: []
}
export const editCourseReducer = (state = initialState , action) => {
  //console.log(action);
  switch(action.type) {
    case types.EDIT_COURSE_START:
      return {
        ...state, editingCourse: true, editedCourse: false
      };
    case types.EDIT_COURSE_FAILURE:
      return {
        ...state, editingCourse: false, editingCourseError: action.payload
      };
    case types.EDIT_COURSE_SUCCESS:
      return {
        ...state,
        editingCourse: false,
        editedCourse: true,
        editCourseData: action.payload
      };
    default:
      return state;
  }
}