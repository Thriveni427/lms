import * as types from './../constants/actionTypes';
const initialState = {
  creatingLiveClass: false,
  createdLiveClass: false,
  creatingCLiveClassError: null,
  createLiveClassData: []
}
export const createLiveClassReducer = (state = initialState , action) => {
  console.log(action);
  switch(action.type) {
    case types.CREATE_LIVE_CLASS_START:
      return {
        ...state, creatingLiveClass: true
      };
    case types.CREATE_LIVE_CLASS_FAILURE:
      return {
        ...state, creatingLiveClass: false, creatingLiveClassError: action.payload
      };
    case types.CREATE_LIVE_CLASS_SUCCESS:
      return {
        ...state,
        creatingLiveClass: false,
        createdLiveClass: true,
        createLiveClassData: action.payload
      };
    default:
      return state;
  }
}