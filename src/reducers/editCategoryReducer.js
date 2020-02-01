import * as types from './../constants/actionTypes';
const initialState = {
  editingCategory: false,
  editedCategory: false,
  editingCategoryError: null,
  editCategoryData: []
}
export const editCategoryReducer = (state = initialState , action) => {
  //console.log(action);
  switch(action.type) {
    case types.EDIT_CATEGORY_START:
      return {
        ...state,
        editingCategory: true
      };
    case types.EDIT_CATEGORY_FAILURE:
      return {
        ...state,
        editingCategory: false,
        editingCategoryError: action.payload
      };
    case types.EDIT_CATEGORY_SUCCESS:
      return {
        ...state,
        editingCategory: false,
        editedCategory: true,
        editCategoryData: action.payload
      };
    default:
      return state;
  }
}