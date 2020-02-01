import * as types from './../constants/actionTypes';
const initialState = {
  addingSession: false,
  addedSession: false,
  addedSessionComplete: false,
  addingSessionError: null,
  addedSessionData: []
}
export const addSessionReducer = (state = initialState, action) => {
  //console.log(action);
  switch (action.type) {
    case types.ADD_SESSION_START:
      return {
        ...state,
        addingSession: true
      };
    case types.ADD_SESSION_FAILURE:
      return {
        ...state,
        addingSession: false,
        addingSessionError: action.payload
      };
    case types.ADD_SESSION_SUCCESS:
      return {
        ...state,
        addingSession: false,
        addedSession: true,
        addedSessionData: action.payload
      };
    case types.ADD_VIDEO_SUCCESS:
      return {
        ...state,
        addingSession: false,
        addedSession: true,
        addedSessionComplete: true,
        addedSessionData: action.payload
      };
    default:
      return state;
  }
}
