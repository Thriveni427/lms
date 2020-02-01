import * as types from '../../constants/actionTypes';
const initialState = {
  fetchingUserCourseWishList: false,
  fetchedUserCourseWishList: false,
  fetchingUserCourseWishListError: null,
  UserCourseWishListData: []
}
export const getUserCourseWishListReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_USER_COURSE_WISH_LIST_START:
      return {
        ...state, fetchingUserCourseWishList: true
      };
    case types.GET_USER_COURSE_WISH_LIST_FAILURE:
      return {
        ...state, fetchingUserCourseWishList: false, fetchingUserCourseWishListError: action.payload
      };
    case types.GET_USER_COURSE_WISH_LIST_SUCCESS:

      console.log(action.payload);
      return {
        ...state,
        fetchingUserCourseWishList: false,
        fetchedUserCourseWishList: true,
        UserCourseWishListData: action.payload
      };
    default:
      return state;
  }
}