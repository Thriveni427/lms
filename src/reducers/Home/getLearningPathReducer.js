import * as types from "../../constants/actionTypes";
const initialState = {
  fetchingLearningPath: false,
  fetchedLearningPath: false,
  fetchingLearningPathError: null,
  LearningPathData: []
};
export const getLearningPathReducer = (state = initialState, action) => {
  //console.log(action);
  switch (action.type) {
    case types.GET_LEARNING_PATH_START:
      return {
        ...state,
        fetchingLearningPath: true
      };
    case types.GET_LEARNING_PATH_FAILURE:
      return {
        ...state,
        fetchingLearningPath: false,
        fetchingLearningPathError: action.payload
      };
    case types.GET_LEARNING_PATH_SUCCESS:
      console.log("Inside getLearningPathReducer : Success");
      console.log(action.payload);
      return {
        ...state,
        fetchingLearningPath: false,
        fetchedLearningPath: true,
        LearningPathData: action.payload
      };
    default:
      return state;
  }
};
