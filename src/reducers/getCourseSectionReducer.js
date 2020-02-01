import * as types from '../constants/actionTypes';
const initialState = {
  gettingSections: false,
  gotSections: false,
  gettingSectionsError: null,
  SectionsData: []
}
export const getCourseSectionReducer = (state = initialState , action) => {
  switch(action.type) {
    case types.GET_SECTION_START:
      return {
        ...state, gettingSections: true
      };
    case types.GET_SECTION_FAILURE:
      return {
        ...state, gettingSections: false, gettingSectionsError: action.payload
      };
    case types.GET_SECTION_SUCCESS:
    console.log("Inside getCourseSectionReducer : SectionsData : ");    
    console.log(action.payload);  
      return {
        ...state,
        gettingSections: false,
        gotSections: true,
        SectionsData: action.payload
      };
    default:
      return state;
  }
}