import * as types from './../constants/actionTypes';
const initialState = {
  setFavoriteIcon: false,
  settedFavoriteIcon: false,
  setFavoriteIconError: null,
  setFavoriteIconData:""
}
export const setFavoriteIconReducer = (state = initialState , action) => {
  console.log(action);
  switch(action.type) {
    case types.SET_FAVORITE_START:
      return {
        ...state, setFavoriteIcon: true
      };
    case types.SET_FAVORITE_FAILURE:
      return {
        ...state, setFavoriteIcon: false, setFavoriteIconError: action.payload
      };
    case types.SET_FAVORITE_SUCCESS:
      return {
        ...state,
        setFavoriteIcon: false,
        settedFavoriteIcon: true,
        setFavoriteIconData: action.payload
      };
    default:
      return state;
  }
}