import * as types from './../constants/actionTypes';
const initialState = {
  gettingMaterial: false,
  gotMaterial: false,
  gettingMaterialError: null,
  materialData: []
}
export const getMaterialReducer = (state = initialState , action) => {
  switch(action.type) {
    case types.GET_MATERIAL_START:
      return {
        ...state, gettingMaterial: true
      };
    case types.GET_MATERIAL_FAILURE:
      return {
        ...state, gettingMaterial: false, gettingMaterialError: action.payload
      };
    case types.GET_MATERIAL_SUCCESS:
        console.log("Inside getMaterialReducer : materialData : ");
        
        console.log(action.payload);  
        return {
            ...state,
            gettingMaterial: false,
            gotMaterial: true,
            materialData: action.payload
        };
    default:
      return state;
  }
}