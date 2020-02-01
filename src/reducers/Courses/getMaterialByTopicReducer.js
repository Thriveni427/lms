import * as types from './../../constants/actionTypes';
const initialState = {
  gettingMaterialByTopic: false,
  gotMaterialByTopic: false,
  gettingMaterialByTopicError: null,
  gotMaterialByTopicData: []
}

export const getMaterialByTopicReducer = (state = initialState, action) => {
console.log(action);

  switch (action.type) {
    case types.GET_MATERIAL_BY_TOPIC_START:
      return {
        ...state,
        gettingMaterialByTopic: true
      };
    case types.GET_MATERIAL_BY_TOPIC_FAILURE:
      return {
        ...state,
        gettingMaterialByTopic: false,
        gettingMaterialByTopicError: action.payload
      };
    case types.GET_MATERIAL_BY_TOPIC_SUCCESS:
      return {
        ...state,
        gettingMaterialByTopic: false,
        gotMaterialByTopic: true,
        gotMaterialByTopicData: action.payload
      };
    default:
      return state;
  }
}
