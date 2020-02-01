import * as types from './../constants/actionTypes';
const initialState = {
  creatingTopic: false,
  createdTopic: false,
  creatingTopicError: null,
  createTopicData: []
}
export const createTopicReducer = (state = initialState, action) => {
  //console.log(action);
  switch (action.type) {
    case types.ADD_TOPIC_START:
      return {
        ...state,
        creatingTopic: true
      };
    case types.ADD_TOPIC_FAILURE:
      return {
        ...state,
        creatingTopic: false,
        creatingTopicError: action.payload
      };
    case types.ADD_TOPIC_SUCCESS:
      return {
        ...state,
        creatingTopic: false,
        createdTopic: true,
        createTopicData: action.payload
      };
    default:
      return state;
  }
}