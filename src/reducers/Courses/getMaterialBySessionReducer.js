import * as types from './../../constants/actionTypes';
const initialState = {
  gettingMaterialBySession: false,
  gotMaterialBySession: false,
  gettingMaterialBySessionError: null,
  gotMaterialBySessionData: []
}
export const getMaterialBySessionReducer = (state = initialState, action) => {

  switch (action.type) {
    case types.GET_MATERIAL_BY_SESSION_START:
      return {
        ...state,
        gettingMaterialBySession: true
      };
    case types.GET_MATERIAL_BY_SESSION_FAILURE:
      return {
        ...state,
        gettingMaterialBySession: false,
        gettingMaterialBySessionError: action.payload
      };
    case types.GET_MATERIAL_BY_SESSION_SUCCESS:
      return {
        ...state,
        gettingMaterialBySession: false,
        gotMaterialBySession: true,
        gotMaterialBySessionData: action.payload
      };
    default:
      return state;
  }
}
