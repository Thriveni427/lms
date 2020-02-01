import * as types from '../../constants/actionTypes';
const initialState = {
    gettingActiveCourseStatus: false,
    gotActiveCourseStatus: false,
    gettingActiveCourseStatusError: null,
    ActiveCourseStatusData: []
}
export const getActiveCourseStatusReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_ACTIVE_COURSE_STATUS_START:
            return {
                ...state, gettingActiveCourseStatus: true
            };
        case types.GET_ACTIVE_COURSE_STATUS_FAILURE:
            return {
                ...state, gettingActiveCourseStatus: false, gettingActiveCourseStatusError: action.payload
            };
        case types.GET_ACTIVE_COURSE_STATUS_SUCCESS:
            console.log("Inside getActiveCourseStatusReducer : ActiveCourseStatusData : ");

            console.log(action.payload);
            return {
                ...state,
                gettingActiveCourseStatus: false,
                gotActiveCourseStatus: true,
                ActiveCourseStatusData: action.payload
            };
        default:
            return state;
    }
}