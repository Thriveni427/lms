import * as types from './../../constants/actionTypes';

const initialState = {
  deleteTopic: false,
  deletedTopic: false,
  deleteTopicError: null,
  deleteTopicData:""
}
export const deleteTopicReducer = (state = initialState , action) => {
  console.log(action);
  switch(action.type) {
    case types.DELETE_TOPIC_START:
      return {
        ...state, deleteTopic: true
      };
    case types.DELETE_TOPIC_FAILURE:
      return {
        ...state, deleteTopic: false, deleteTopicError: action.payload
      };
    case types.DELETE_TOPIC_SUCCESS:
      return {
        ...state,
        deleteTopic: false,
        deletedTopic: true,
        deleteTopicData: action.payload
      };
    default:
      return state;
  }
}