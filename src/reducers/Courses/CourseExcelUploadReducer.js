import * as types from './../../constants/actionTypes';
const initialState = {
  uploadingCourseExcel: false,
  uploadedCourseExcel: false,
  uploadingCourseExcelError: null,
  uploadedCourseExcelData: []
}
export const courseExcelUploadReducer = (state = initialState, action) => {

  switch (action.type) {
    case types.UPLOAD_COURSE_EXCEL_START:
      return {
        ...state,
        uploadingCourseExcel: true
      };
    case types.UPLOAD_COURSE_EXCEL_FAILURE:
      return {
        ...state,
        uploadingCourseExcel: false,
        uploadingCourseExcelError: action.payload
      };
    case types.UPLOAD_COURSE_EXCEL_SUCCESS:
      return {
        ...state,
        uploadingCourseExcel: false,
        uploadedCourseExcel: true,
        uploadedCourseExcelData: action.payload
      };
    default:
      return state;
  }
}
