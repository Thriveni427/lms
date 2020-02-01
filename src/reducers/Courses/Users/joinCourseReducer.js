import * as types from './../../../constants/actionTypes';
const initialState = {
  joiningCourse: false,
  joinedCourse: false,
  joiningCourseError: null,
  joinedCourseData: []
}
export const joinCourseReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.JOIN_COURSE_START:
            return {
                ...state,
                joiningCourse: true,
                joinedCourse: false,
            };
        case types.JOIN_COURSE_FAILURE:
            return {
                ...state,
                joiningCourse: false,
                joiningCourseError: action.payload
            };
        case types.JOIN_COURSE_SUCCESS:
            return {
                ...state,
                joiningCourse: false,
                joinedCourse: true,
                joinedCourseData: action.payload
            };
        default:
            return state;
    }
}
