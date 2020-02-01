import * as types from './../constants/actionTypes';
const initialState = {
  editingLiveClass: false,
  editedLiveClass: false,
  editingLiveClassError: null,
  editLiveClassData: []
}
export const editLiveClassReducer = (state = initialState , action) => {
  //console.log(action);
  switch(action.type) {
    case types.EDIT_LIVE_CLASS_START:
      return {
        ...state, editingLiveClass: true, editedLiveClass: false
      };
    case types.EDIT_LIVE_CLASS_FAILURE:
      return {
        ...state, editingLiveClass: false, editingLiveClassError: action.payload
      };
    case types.EDIT_LIVE_CLASS_SUCCESS:
      return {
        ...state,
        editingLiveClass: false,
        editedLiveClass: true,
        editLiveClassData: action.payload
      };
    default:
      return state;
  }
}