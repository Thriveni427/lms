import * as types from './../../constants/actionTypes';
const initialState = {
  fetchingGamifications: false,
  fetchedGamifications: false,
  fetchingGamificationsError: null,
  GamificationsData: [],
  editingGamifications: false,
  editedGamifications: false,
  editingGamificationsError: null,
  editGamificationsData: [],
  deleteGamifications: false,
  deletedGamifications: false,
  deleteGamificationsError: null,
  deleteGamificationsData:""
}
export const GamificationsReducer = (state = initialState , action) => {
  //console.log(action);
  switch(action.type) {
    case types.GAMIFICATION_START:
      return {
        ...state, fetchingGamifications: true
      };
    case types.GAMIFICATION_FAILURE:
      return {
        ...state, fetchingGamifications: false, fetchingGamificationsError: action.payload
      };
    case types.GAMIFICATION_SUCCESS:
      return {
        ...state,
        fetchingGamifications: false,
        fetchedGamifications: true,
        GamificationsData: action.payload
      };
    default:
      return state;
  }
}

export const editGamificationsReducer = (state = initialState , action) => {
	//console.log(action);
	switch(action.type) {
		case types.EDIT_GAMIFICATION_START:
			return {
				...state, editingGamifications: true, editedGamifications: false
			};
		case types.EDIT_GAMIFICATION_FAILURE:
			return {
				...state, editingGamifications: false, editingGamificationsError: action.payload
			};
		case types.EDIT_GAMIFICATION_SUCCESS:
			return {
				...state,
				editingGamifications: false,
				editedGamifications: true,
				editGamificationsData: action.payload
			};
		default:
			return state;
	}
}

export const deleteGamificationsReducer = (state = initialState , action) => {
  console.log(action);
  switch(action.type) {
    case types.DELETE_GAMIFICATION_START:
      return {
        ...state, deleteGamifications: true
      };
    case types.DELETE_GAMIFICATION_FAILURE:
      return {
        ...state, deleteGamifications: false, deleteGamificationsError: action.payload
      };
    case types.DELETE_GAMIFICATION_SUCCESS:
      return {
        ...state,
        deleteGamifications: false,
        deletedGamifications: true,
        deleteGamificationsData: action.payload
      };
    default:
      return state;
  }
}