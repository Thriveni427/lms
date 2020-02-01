import * as types from './../../../constants/actionTypes';
import axios from 'axios';
import * as GLOBAL from '../../../utils/index';


export const actionGetMaterialBySection = (data) => {
  console.log(JSON.stringify(data))
  return dispatch => {
    dispatch({type: types.GET_MATERIAL_BY_SECTION_START})
    return axios.post(`${GLOBAL.API_HOST}/getCourseMaterialDetails1`, data)
    .then(res => {
      console.log(res)
      if(res.data.status === 200){
        dispatch({type: types.GET_MATERIAL_BY_SECTION_SUCCESS, payload: res.data.data})
      }else{
        dispatch({type: types.GET_MATERIAL_BY_SECTION_FAILURE, payload: res.data.message})
      }
    })
    .catch(err => {
      dispatch({type: types.GET_MATERIAL_BY_SECTION_FAILURE, payload: err})
    })
  }
}
