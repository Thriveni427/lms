import * as types from './../../constants/actionTypes';
const initialState = {
  downloadingCourseUploadTemplate: false,
  downloadedCourseUploadTemplate: false,
  downloadingCourseUploadTemplateError: null,
  downloadedCourseUploadTemplateData: []
}

export const downloadCourseUploadTemplateReducer = (state = initialState, action) => {

  switch (action.type) {
    case types.DOWNLOAD_COURSE_UPLOAD_TEMPLATE_START:
      return {
        ...state,
        downloadingCourseUploadTemplate: true
      };
    case types.DOWNLOAD_COURSE_UPLOAD_TEMPLATE_FAILURE:
      return {
        ...state,
        downloadingCourseUploadTemplate: false,
        downloadingCourseUploadTemplateError: action.payload,
        downloadedCourseUploadTemplateData: action.payload
      };
    case types.DOWNLOAD_COURSE_UPLOAD_TEMPLATE_SUCCESS:
      return {
        ...state,
        downloadingCourseUploadTemplate: false,
        downloadedCourseUploadTemplate: true,
        downloadedCourseUploadTemplateData: action.payload
      };
    default:
      return state;
  }
}
