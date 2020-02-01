import * as types from '../constants/actionTypes';
const initialState = {
    showAllCourses: false,
    showAssignedCourses: false,
    showRecommendedCourses: false,
    gettingAssignedCourses: false,
    gotAssignedCourses: false,
    gettingAssignedCoursesError: null,
    gettingAllCourses: false,
    gotAllCourses: false,
    gettingAllCoursesError: null,
    courseData: []
}

export const getUserCoursesReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SHOW_ALL_COURSE:
            return {
                ...state,
                showAllCourses: true,
                showAssignedCourses: false,
                showRecommendedCourses: false,
            };
        case types.SHOW_ASSIGNED_COURSE:
            return {
                ...state,
                showAllCourses: false,
                showAssignedCourses: true,
                showRecommendedCourses: false,

            };
        case types.SHOW_RECOMMENDED_COURSE:
            return {
                ...state,
                showAllCourses: true,
                showAssignedCourses: false,
                showRecommendedCourses: true,
            };
        case types.GET_ASSIGNED_COURSES_START:
            return {
                ...state,
                gettingAssignedCourses: true,
                gotAssignedCourses: false,
            };
        case types.GET_ASSIGNED_COURSES_SUCCESS:
            return {
                ...state,
                gettingAssignedCourses: false,
                gotAssignedCourses: true,
                courseData: action.payload,
            };
        case types.GET_ASSIGNED_COURSES_FAILURE:
            return {
                ...state,
                gettingAssignedCourses: false,
                gotAssignedCourses: false,
                gettingAssignedCoursesError: true,
            };
        case types.GET_ALL_COURSES_START:
            return {
                ...state,
                gettingAllCourses: true,
                gotAllCourses: false,
            };
        case types.GET_ALL_COURSES_SUCCESS:
            return {
                ...state,
                gettingAllCourses: false,
                gotAllCourses: true,
                courseData: action.payload,
            };
        case types.GET_ALL_COURSES_FAILURE:
            return {
                ...state,
                gettingAllCourses: false,
                gotAllCourses: false,
                gettingAllCoursesError: true,
            };
        default:
            return state;
    }
}