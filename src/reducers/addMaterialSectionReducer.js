import * as types from '../constants/actionTypes';
const initialState = {
  showNewFolder: false,
  showAddFile: false,
  showAddVideos: false,
  showAddContent: false,
  showAddAssignment: false,
  showAddQTest: false,
  showAddScorm: false,
  addingQTest: false,
  addedQTest: false,
  addingQTestError: null,
  addingAssignment: false,
  addedAssignment: false,
  addingAssignmentError: null,
  addingMaterialSection: false,
  addedMaterialSection: false,
  addingMaterialSectionError: null,
  addingContent: false,
  addedContent: false,
  addingContentError: false,
  addingVideo: false,
  addedVideo: false,
  addingVideoError: false,
  addingFile: false,
  addedFile: false,
  addingFileError: false,
  addingScorm: false,
  addedScorm: false,
  addingScormError: null,
  sectionData: [],
  qPaper:[],
}
export const addMaterialSectionReducer = (state = initialState , action) => {
  switch(action.type) {
    case types.ADD_QTEST_START:
    console.log("ADD_QTEST_START");
    
      return {
        ...state,
       addingQTest : true
      };
    case types.ADD_QTEST_FAILURE:
    console.log("ADD_QTEST_FAILURE");
    
      return {
        ...state,
        addingQTest: false,
        addedQTest: false,
        addingQTestError: action.payload
      };
    case types.ADD_QTEST_SUCCESS:
    console.log("ADD_QTEST_SUCCESS");
    
      return {
        ...state,
        addingQTest: false,
        addedQTest: true,
        showNewFolder: false,
        showAddContent: false,
        showAddFile: false,
        showAddVideos: false,
        showAddAssignment: false,
        showAddScorm:false,
        showAddQTest: true,
        qPaper: action.payload
      };
    case types.ADD_ASSIGNMENT_START:
      return {
        ...state,
        addingAssignment: true
      };
    case types.ADD_ASSIGNMENT_FAILURE:
      return {
        ...state,
        addingAssignment: false,
        addingAssignmentError: action.payload
      };
    case types.ADD_ASSIGNMENT_SUCCESS:
      return {
        ...state,
        addingAssignment: false,
        addedAssignment: true,
        showNewFolder: false,
        showAddContent: false,
        showAddFile: false,
        showAddVideos: false,
        showAddAssignment: false,
        showAddScorm:false,
        showAddQTest:false,
        sectionData: action.payload
      };
    case types.ADD_SECTION_START:
      return {
        ...state, addingMaterialSection: true
      };
    case types.ADD_SECTION_FAILURE:
      return {
        ...state, addingMaterialSection: false, addingMaterialSectionError: action.payload
      };
    case types.ADD_SECTION_SUCCESS:
      return {
        ...state,
        addingMaterialSection: false,
        addedMaterialSection: true,
        showNewFolder: false,
        showAddContent: false,
        showAddFile: false,
        showAddVideos: false,
        showAddScorm:false,
        showAddQTest:false,
        sectionData: action.payload
      };
    case types.ADD_CONTENT_START:
      return {
        ...state,
        addingContent: true
      };
    case types.ADD_CONTENT_FAILURE:
      return {
        ...state,
        addingContent: false,
        addingContentError: action.payload
      };
    case types.ADD_CONTENT_SUCCESS:
      return {
        ...state,
        addingContent: false,
        addedContent: true,
        showNewFolder: false,
        showAddContent: false,
        showAddFile: false,
        showAddVideos: false,
        showAddScorm:false,
        showAddQTest:false,
        sectionData: action.payload
      };
      case types.ADD_VIDEO_START:
      return {
        ...state,
        addingVideo: true
      };
    case types.ADD_VIDEO_FAILURE:
      return {
        ...state,
        addingVideo: false,
        addingVideoError: action.payload
      };
    case types.ADD_VIDEO_SUCCESS:
      return {
        ...state,
        addingVideo: false,
        addedVideo: true,
        showNewFolder: false,
        showAddContent: false,
        showAddFile: false,
        showAddVideos: false,
        showAddScorm:false,
        showAddQTest:false,
        sectionData: action.payload
      };
      case types.ADD_FILE_START:
      return {
        ...state,
        addingFile: true
      };
    case types.ADD_FILE_FAILURE:
      return {
        ...state,
        addingFile: false,
        addingFileError: action.payload
      };
    case types.ADD_FILE_SUCCESS:
      return {
        ...state,
        addingFile: false,
        addedFile: true,
        showNewFolder: false,
        showAddContent: false,
        showAddFile: false,
        showAddVideos: false,
        showAddScorm:false,
        showAddQTest:false,
        sectionData: action.payload
      };
      case types.ADD_SCORM_START:
      return {
        ...state,
        addingScorm: true
      };
    case types.ADD_SCORM_FAILURE:
      return {
        ...state,
        addingScorm: false,
        addingScormError: action.payload
      };
    case types.ADD_SCORM_SUCCESS:
      return {
        ...state,
        addingScorm: false,
        addedScorm: true,
        showNewFolder: false,
        showAddContent: false,
        showAddFile: false,
        showAddVideos: false,
        showAddScorm:false,
        showAddQTest:false,
        sectionData: action.payload
      };
    case types.ENABLE_ADD_ASSIGNMENT:
      return {
        ...state,
        showNewFolder: false,
        showAddFile: false,
        showAddVideos: false,
        showAddContent: false,
        showAddAssignment: true,
        showAddScorm:false,
        showAddQTest: false
      };
    case types.ENABLE_ADD_CONTENT:
      return {
        ...state,
        showNewFolder: false,
        showAddFile: false,
        showAddVideos: false,
        showAddContent: true,
        showAddAssignment: false,
        showAddScorm:false,
        showAddQTest: false
      };
    case types.ENABLE_ADD_FOLDER:
      return {
        ...state,
        showNewFolder: true,
        showAddFile: false,
        showAddVideos: false,
        showAddContent: false,
        showAddAssignment: false,
        showAddScorm:false,
        showAddQTest: false
      };
    case types.ENABLE_ADD_FILE:
      return {
        ...state,
        showNewFolder: false,
        showAddFile: true,
        showAddVideos: false,
        showAddContent: false,
        showAddAssignment: false,
        showAddScorm:false,
        showAddQTest: false
      };
    case types.ENABLE_ADD_VIDEO:
      return {
        ...state,
        showNewFolder: false,
        showAddFile: false,
        showAddVideos: true,
        showAddContent: false,
        showAddAssignment: false,
        showAddScorm:false,
        showAddQTest: false
      };
      case types.ENABLE_ADD_SCORM:
      return {
        ...state,
        showNewFolder: false,
        showAddFile: false,
        showAddVideos: false,
        showAddContent: false,
        showAddAssignment: false,
        showAddScorm: true,
        showAddQTest: false
      };
      case types.ENABLE_ADD_Q_TEST:
      return {
        ...state,
        showNewFolder: false,
        showAddFile: false,
        showAddVideos: false,
        showAddContent: false,
        showAddAssignment: false,
        showAddScorm: false,
        showAddQTest: true
      };
      case types.DISABLE_ADD_FILE:
      return {
        ...state,
        showNewFolder: false,
        showAddFile: false,
        showAddVideos: false,
        showAddContent: false,
        showAddAssignment: false,
        showAddScorm: false,
        showAddQTest: false
      };
    default:
      return state;
  }
}