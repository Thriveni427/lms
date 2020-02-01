import * as types from './../../../constants/actionTypes';
const initialState = {
  addingRemarksByAdmin: false,
  addedRemarksByAdmin: false,
  addingRemarksByAdminError: null,
  addedRemarksByAdminData: []
}
export const addRemarksByAdminReducer = (state = initialState, action) => {
  //console.log(action);
  switch (action.type) {
    case types.ADD_REMARKS_BY_ADMIN_START:
      return {
        ...state, addingRemarksByAdmin: true
      };
    case types.ADD_REMARKS_BY_ADMIN_FAILURE:
      return {
        ...state, addingRemarksByAdmin: false, addingRemarksByAdminError: action.payload
      };
    case types.ADD_REMARKS_BY_ADMIN_SUCCESS:
      return {
        ...state,
        addingRemarksByAdmin: false,
        addedRemarksByAdmin: true,
        addedRemarksByAdminData: action.payload
      };
    default:
      return state;
  }
}