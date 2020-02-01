import * as types from '../../constants/actionTypes';
const initialState = {
    gettingCourseCompletedStatus: false,
    gotCourseCompletedStatus: false,
    gettingCourseCompletedStatusError: null,
    CourseCompletedStatusData: []
}
export const getCourseCompletedStatusReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_COURSE_COMPLETED_STATUS_START:
            return {
                ...state, gettingCourseCompletedStatus: true
            };
        case types.GET_COURSE_COMPLETED_STATUS_FAILURE:
            return {
                ...state, gettingCourseCompletedStatus: false, gettingCourseCompletedStatusError: action.payload
            };
        case types.GET_COURSE_COMPLETED_STATUS_SUCCESS:
            console.log("Inside getCourseCompletedStatusReducer : CourseCompletedStatusData : ");

            console.log(action.payload);
            return {
                ...state,
                gettingCourseCompletedStatus: false,
                gotCourseCompletedStatus: true,
                CourseCompletedStatusData: action.payload
            };
        default:
            return state;
    }
}