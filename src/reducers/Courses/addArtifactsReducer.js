import * as types from './../../constants/actionTypes';
const initialState = {
  addingArtifacts: false,
  addedArtifacts: false,
  addingArtifactsError: null,
  addedArtifactsData: []
}
export const addArtifactsReducer = (state = initialState , action) => {
  //console.log(action);
  switch(action.type) {
    case types.ADD_ARTIFACTS_START:
      return {
        ...state, addingArtifacts: true
      };
    case types.ADD_ARTIFACTS_FAILURE:
      return {
        ...state, addingArtifacts: false, addingArtifactsError: action.payload
      };
    case types.ADD_ARTIFACTS_SUCCESS:
      return {
        ...state,
        addingArtifacts: false,
        addedArtifacts: true,
        addedArtifactsData: action.payload
      };
    default:
      return state;
  }
}