import * as types from './../constants/actionTypes';
const initialState = {
  showNewFolder: false,
  showAddFile: false,
  showAddVideos: false,
  showAddContent: false
}
export const setupCourseReducer = (state = initialState , action) => {
  switch(action.type) {
    case types.ENABLE_ADD_CONTENT:
    return {
      ...state,
      showNewFolder: false,
      showAddFile: false,
      showAddVideos: false,
      showAddContent: true
    };
    case types.ENABLE_ADD_FOLDER:
      return {
        ...state,
        showNewFolder: true,
        showAddFile: false,
        showAddVideos: false,
        showAddContent: false
      };
    case types.ENABLE_ADD_FILE:
      return {
        ...state,
        showNewFolder: false,
        showAddFile: true,
        showAddVideos: false,
        showAddContent: false
      };
    case types.ENABLE_ADD_VIDEO:
      return {
        ...state,
        showNewFolder: false,
        showAddFile: false,
        showAddVideos: true,
        showAddContent: false
      };
    default:
      return state;
  }
}