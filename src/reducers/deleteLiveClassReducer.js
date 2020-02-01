import * as types from '../constants/actionTypes';
const initialState = {
  deleteLiveClass: false,
  deletedLiveClass: false,
  deleteLiveClassError: null,
  deleteLiveClassData:""
}
export const deleteLiveClassReducer = (state = initialState , action) => {
  console.log(action);
  switch(action.type) {
    case types.DELETE_LIVE_CLASS_START:
      return {
        ...state, deleteLiveClass: true
      };
    case types.DELETE_LIVE_CLASS_FAILURE:
      return {
        ...state, deleteLiveClass: false, deleteLiveClassError: action.payload
      };
    case types.DELETE_LIVE_CLASS_SUCCESS:
      return {
        ...state,
        deleteLiveClass: false,
        deletedLiveClass: true,
        deleteLiveClassData: action.payload
      };
    default:
      return state;
  }
}