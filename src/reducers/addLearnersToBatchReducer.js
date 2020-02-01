import * as types from '../constants/actionTypes';
const initialState = {
  addinigLearnersToBatch: false,
  addedLearnersToBatch: false,
  addinigLearnersToBatchError: null,
  addLearnersToBatch: []
}

export const addLearnersToBatchReducer = (state = initialState , action) => {
  //console.log(action);
  switch(action.type) {
    case types.ASSIGN_BATCH_START:
      return {
        ...state, addinigLearnersToBatch: true
      };
    case types.ASSIGN_BATCH_FAILURE:
      return {
        ...state, addinigLearnersToBatch: false, addinigLearnersToBatchError: action.payload
      };
    case types.ASSIGN_BATCH_SUCCESS:
      return {
        ...state,
        addinigLearnersToBatch: false,
        addedLearnersToBatch: true,
        addLearnersToBatch: action.payload
      };
    default:
      return state;
  }
}