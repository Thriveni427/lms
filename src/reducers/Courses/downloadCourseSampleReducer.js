import * as types from './../../constants/actionTypes';
const initialState = {
  downloadingCourseSample: false,
  downloadedCourseSample: false,
  downloadingCourseSampleError: null,
  downloadedCourseSampleData: []
}
export const downloadCourseSampleReducer = (state = initialState, action) => {

  switch (action.type) {
    case types.DOWNLOAD_COURSE_SAMPLE_START:
      return {
        ...state,
        downloadingCourseSample: true
      };
    case types.DOWNLOAD_COURSE_SAMPLE_FAILURE:
      return {
        ...state,
        downloadingCourseSample: false,
        downloadingCourseSampleError: action.payload,
        downloadedCourseSampleData: action.payload
      };
    case types.DOWNLOAD_COURSE_SAMPLE_SUCCESS:
      return {
        ...state,
        downloadingCourseSample: false,
        downloadedCourseSample: true,
        downloadedCourseSampleData: action.payload
      };
    default:
      return state;
  }
}
