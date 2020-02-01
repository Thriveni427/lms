import * as types from './../../../constants/actionTypes';
const initialState = {
    fetchingMaterialBySection: false,
    fetchedMaterialBySection: false,
    fetchingMaterialBySectionError: null,
    MaterialBySectionData: []
}
export const getMaterialBySectionReducer = (state = initialState, action) => {
    //console.log(action);
    switch (action.type) {
        case types.GET_MATERIAL_BY_SECTION_START:
            return {
                ...state,
                fetchingMaterialBySection: true,
                fetchedMaterialBySection: false,
            };
        case types.GET_MATERIAL_BY_SECTION_FAILURE:
            return {
                ...state,
                fetchingMaterialBySection: false,
                fetchingMaterialBySectionError: action.payload
            };
        case types.GET_MATERIAL_BY_SECTION_SUCCESS:
            return {
                ...state,
                fetchingMaterialBySection: false,
                fetchedMaterialBySection: true,
                MaterialBySectionData: action.payload
            };
        default:
            return state;
    }
}
