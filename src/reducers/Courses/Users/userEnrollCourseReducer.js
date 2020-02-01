import * as types from './../../../constants/actionTypes';
const initialState = {
  userEnrollingCourse: false,
  userEnrolledCourse: false,
  userEnrollingCourseError: null,
  userEnrolledCourseData: []
}
export const userEnrollCourseReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_USER_ENROLL_COURCE_START:
            return {
                ...state,
                userEnrollingCourse: true,
                userEnrolledCourse: false,
            };
        case types.ADD_USER_ENROLL_COURCE_FAILURE:
            return {
                ...state,
                userEnrollingCourse: false,
                userEnrollingCourseError: action.payload
            };
        case types.ADD_USER_ENROLL_COURCE_SUCCESS:
            return {
                ...state,
                userEnrollingCourse: false,
                userEnrolledCourse: true,
                userEnrolledCourseData: action.payload
            };
        default:
            return state;
    }
}
