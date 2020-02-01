import * as types from './../constants/actionTypes';
const initialState = {
  gettingCategory: false,
  gotCategory: false,
  gettingCategoryError: null,
  getCategoryData: []
}
export const getCategoryReducer = (state = initialState , action) => {
  //console.log(action);
  switch(action.type) {
    case types.GET_CATEGORY_START:
      return {
        ...state,
        gettingCategory: true
      };
    case types.GET_CATEGORY_FAILURE:
      return {
        ...state,
        gettingCategory: false,
        gettingCategoryError: action.payload
      };
    case types.GET_CATEGORY_SUCCESS:
      return {
        ...state,
        gettingCategory: false,
        gotCategory: true,
        getCategoryData: action.payload
      };
    default:
      return state;
  }
}