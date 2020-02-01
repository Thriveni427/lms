import * as types from './../constants/actionTypes';
const initialState = {
  addingCategory: false,
  addedCategory: false,
  addingCategoryError: null,
  addCategoryData: []
}
export const addCategoryReducer = (state = initialState , action) => {
  //console.log(action);
  switch(action.type) {
    case types.ADD_CATEGORY_START:
      return {
        ...state,
        addingCategory: true
      };
    case types.ADD_CATEGORY_FAILURE:
      return {
        ...state,
        addingCategory: false,
        addingCategoryError: action.payload
      };
    case types.ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        addingCategory: false,
        addedCategory: true,
        addCategoryData: action.payload
      };
    default:
      return state;
  }
}