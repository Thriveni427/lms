import * as types from "../../constants/actionTypes";
const initialState = {
  fetchingPopularCourses: false,
  fetchedPopularCourses: false,
  fetchingPopularCoursesError: null,
  popularCoursesData: []
};
export const getPopularCoursesReducer = (state = initialState, action) => {
  //console.log(action);
  switch (action.type) {
    case types.GET_POPULAR_COURSES_LIST_START:
      return {
        ...state,
        fetchingPopularCourses: true
      };
    case types.GET_POPULAR_COURSES_LIST_FAILURE:
      return {
        ...state,
        fetchingPopularCourses: false,
        fetchingPopularCoursesError: action.payload
      };
    case types.GET_POPULAR_COURSES_LIST_SUCCESS:
      console.log("Inside getPopularCoursesReducer : Success");
      console.log(action.payload);
      return {
        ...state,
        fetchingPopularCourses: false,
        fetchedPopularCourses: true,
        popularCoursesData: action.payload
      };
    default:
      return state;
  }
};
