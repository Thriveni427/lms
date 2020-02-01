import * as types from './../constants/actionTypes';
const initialState = {
  gettingCategoryList: false,
  gotCategoryList: false,
  gettingCategoryListError: null,
  getCategoryListData: []
}
export const getCategoryListReducer = (state = initialState , action) => {
  //console.log(action);
  switch(action.type) {
    case types.GET_CATEGORY_LIST_START:
      return {
        ...state,
        gettingCategoryList: true
      };
    case types.GET_CATEGORY_LIST_FAILURE:
      return {
        ...state,
        gettingCategoryList: false,
        gettingCategoryListError: action.payload
      };
    case types.GET_CATEGORY_LIST_SUCCESS:
      console.log("Inside getCategoryListReducer : Success");
      console.log(action.payload);      
      return {
        ...state,
        gettingCategoryList: false,
        gotCategoryList: true,
        getCategoryListData: action.payload
      };
    default:
      return state;
  }
}