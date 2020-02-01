import * as types from '../../constants/actionTypes';
const initialState = {
  gettingNestedCategory: false,
  gotNestedCategory: false,
  gettingNestedCategoryError: null,
  gotNestedCategoryData: []
}
export const getNestedCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_NESTED_CATEGORY_START:
      return {
        ...state, gettingNestedCategory: true
      };
    case types.GET_NESTED_CATEGORY_FAILURE:
      return {
        ...state, gettingNestedCategory: false, gettingNestedCategoryError: action.payload
      };
    case types.GET_NESTED_CATEGORY_SUCCESS:
      console.log("Inside getCourseCompletedStatusReducer : gotNestedCategoryData : ");

      console.log(action.payload);
      return {
        ...state,
        gettingNestedCategory: false,
        gotNestedCategory: true,
        gotNestedCategoryData: action.payload
      };
    default:
      return state;
  }
}