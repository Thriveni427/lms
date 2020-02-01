import * as types from './../../constants/actionTypes';
const initialState = {
  gettingFirstMaterialByCourse: false,
  gotFirstMaterialByCourse: false,
  gettingFirstMaterialByCourseError: null,
  gotFirstMaterialByCourseData: []
}
export const getFirstMaterialByCourseReducer = (state = initialState, action) => {

  switch (action.type) {
    case types.GET_FIRST_MATERIAL_BY_COURSE_START:
      return {
        ...state,
        gettingFirstMaterialByCourse: true
      };
    case types.GET_FIRST_MATERIAL_BY_COURSE_FAILURE:
      return {
        ...state,
        gettingFirstMaterialByCourse: false,
        gettingFirstMaterialByCourseError: action.payload
      };
    case types.GET_FIRST_MATERIAL_BY_COURSE_SUCCESS:
      return {
        ...state,
        gettingFirstMaterialByCourse: false,
        gotFirstMaterialByCourse: true,
        gotFirstMaterialByCourseData: action.payload
      };
    default:
      return state;
  }
}
