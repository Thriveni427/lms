
import * as types from "../../constants/actionTypes";

const initialState = {
  addingCourseToWishList: false,
  addedCourseToWishList: false,
  addingCourseToWishListError: null,
  addedCourseToWishListData: []
}
export const addCourseToWishListReducer = (state = initialState, action) => {
  //console.log(action);
  switch (action.type) {
    case types.ADD_COURSE_TO_WISH_LIST_START:
      return {
        ...state, addingCourseToWishList: true
      };
    case types.ADD_COURSE_TO_WISH_LIST_FAILURE:
      return {
        ...state, addingCourseToWishList: false, addingCourseToWishListError: action.payload
      };
    case types.ADD_COURSE_TO_WISH_LIST_SUCCESS:
      return {
        ...state,
        addingCourseToWishList: false,
        addedCourseToWishList: true,
        addedCourseToWishListData: action.payload
      };
    default:
      return state;
  }
}