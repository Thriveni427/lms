import * as types from './../constants/actionTypes';
const initialState = {
  fetchingLiveClass: false,
  fetchedLiveClass: false,
  fetchingLiveClassError: null,
  LiveClassData: []
}
export const getLiveClassReducer = (state = initialState , action) => {
  //console.log(action);
  switch(action.type) {
    case types.GET_LIVE_CLASS_LIST_START:
      return {
        ...state, fetchingLiveClass: true
      };
    case types.GET_LIVE_CLASS_LIST_FAILURE:
      return {
        ...state, fetchingLiveClass: false, fetchingLiveClassError: action.payload
      };
    case types.GET_LIVE_CLASS_LIST_SUCCESS:
      return {
        ...state,
        fetchingLiveClass: false,
        fetchedLiveClass: true,
        LiveClassData: action.payload
      };
    default:
      return state;
  }
}