import * as types from './../../constants/actionTypes';
const initialState = {
  uploadingQuestionsFile: false,
  uploadedQuestionsFile: false,
  uploadingQuestionsFileError: null,
  uploadedQuestionsFileData: []
}

export const uploadQuestionsReducer = (state = initialState, action) => {

  switch (action.type) {
    case types.UPLOAD_QUESTIONS_FILE_START:
      return {
        ...state,
        uploadingQuestionsFile: true
      };
    case types.UPLOAD_QUESTIONS_FILE_FAILURE:
      return {
        ...state,
        uploadingQuestionsFile: false,
        uploadingQuestionsFileError: action.payload
      };
    case types.UPLOAD_QUESTIONS_FILE_SUCCESS:
      return {
        ...state,
        uploadingQuestionsFile: false,
        uploadedQuestionsFile: true,
        uploadedQuestionsFileData: action.payload
      };
    default:
      return state;
  }
}
