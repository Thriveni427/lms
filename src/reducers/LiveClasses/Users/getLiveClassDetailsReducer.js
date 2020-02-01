import * as types from './../../../constants/actionTypes';
const initialState = {
  fetchingLiveClassDetail: false,
  fetchedLiveClassDetail: false,
  fetchingLiveClassDetailError: null,
  LiveClassDetailData: []
}
export const getLiveClassDetailsReducer = (state = initialState , action) => {
  //console.log(action);
  switch(action.type) {
    case types.GET_LIVE_CLASS_DETAILS_START:
      return {
        ...state, fetchingLiveClassDetail: true
      };
    case types.GET_LIVE_CLASS_DETAILS_FAILURE:
      return {
        ...state, fetchingLiveClassDetail: false, fetchingLiveClassDetailError: action.payload
      };
    case types.GET_LIVE_CLASS_DETAILS_SUCCESS:
      return {
        ...state,
        fetchingLiveClassDetail: false,
        fetchedLiveClassDetail: true,
        LiveClassDetailData: action.payload
      };
    default:
      return state;
  }
}