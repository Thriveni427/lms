import * as types from '../../constants/actionTypes';
const initialState = {
  gettingLearningPathByCategory: false,
  gotLearningPathByCategory: false,
  gettingLearningPathByCategoryError: null,
  gotLearningPathByCategoryData: []
}
export const getLearningPathByCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_NESTED_LEARNING_PATH_BY_CATEGORY_START:
      return {
        ...state, gettingLearningPathByCategory: true
      };
    case types.GET_NESTED_LEARNING_PATH_BY_CATEGORY_FAILURE:
      return {
        ...state, gettingLearningPathByCategory: false, gettingLearningPathByCategoryError: action.payload
      };
    case types.GET_NESTED_LEARNING_PATH_BY_CATEGORY_SUCCESS:

      console.log(action.payload);
      return {
        ...state,
        gettingLearningPathByCategory: false,
        gotLearningPathByCategory: true,
        gotLearningPathByCategoryData: action.payload
      };
    default:
      return state;
  }
}