import * as types from '../../constants/actionTypes';
const initialState = {
    gettingLearnerStatus: false,
    gotLearnerStatus: false,
    gettingLearnerStatusError: null,
    LearnerStatusData: []
}
export const getLearnerReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_LEARNER_STATUS_START:
            return {
                ...state, gettingLearnerStatus: true
            };
        case types.GET_LEARNER_STATUS_FAILURE:
            return {
                ...state, gettingLearnerStatus: false, gettingLearnerStatusError: action.payload
            };
        case types.GET_LEARNER_STATUS_SUCCESS:
            console.log("Inside getLearnerReducer : LearnerStatusData : ");

            console.log(action.payload);
            return {
                ...state,
                gettingLearnerStatus: false,
                gotLearnerStatus: true,
                LearnerStatusData: action.payload
            };
        default:
            return state;
    }
}