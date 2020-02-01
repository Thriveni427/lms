import * as types from '../../constants/actionTypes';
const initialState = {
    gettingCoursesByCategory: false,
    gotCoursesByCategory: false,
    gettingCoursesByCategoryError: null,
    gettingCoursesByCategoryData: []
}
export const getCoursesByCategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_COURSES_BY_CATEGORY_START:
            return {
                ...state, gettingCoursesByCategory: true
            };
        case types.GET_COURSES_BY_CATEGORY_FAILURE:
            return {
                ...state, gettingCoursesByCategory: false, gettingCoursesByCategoryError: action.payload
            };
        case types.GET_COURSES_BY_CATEGORY_SUCCESS:

            console.log(action.payload);
            return {
                ...state,
                gettingCoursesByCategory: false,
                gotCoursesByCategory: true,
                gettingCoursesByCategoryData: action.payload
            };
        default:
            return state;
    }
}