import * as types from './../constants/actionTypes';
import { toast } from "react-toastify";
import axios from 'axios';
import * as GLOBAL from '../utils/index';

export const actionGetMaterial = (data) => {
  console.log(JSON.stringify(data))
  return dispatch => {
    dispatch({type: types.GET_MATERIAL_START})
    return axios.post(`${GLOBAL.API_HOST}/getCourseMaterialDetails`, data)
    .then(res => {
      console.log(res)
      if(res.data.status === 200){
        dispatch({type: types.GET_MATERIAL_SUCCESS, payload: res.data.data})
      }else{
        dispatch({type: types.GET_MATERIAL_FAILURE, payload: res.data.message})
      }
    })
    .catch(err => {
      dispatch({type: types.GET_MATERIAL_FAILURE, payload: err})
    })
  }
}

export const actionMaterialSection = (data) => {
  console.log(JSON.stringify(data))
  return dispatch => {
    dispatch({type: types.ADD_SECTION_START})
    return axios.post(`${GLOBAL.API_HOST}/createSection`, data)
    .then(res => {
      console.log(res)
      if(res.data.status === 200){
        toast.success(res.data.message);
        dispatch({type: types.ADD_SECTION_SUCCESS, payload: res.data.data})
      }else{
        toast.error(res.data.message);
        dispatch({type: types.ADD_SECTION_FAILURE, payload: res.data.message})
      }
    })
    .catch(err => {
      toast.error(err);
      dispatch({type: types.ADD_SECTION_FAILURE, payload: err})
    })
  }
}

export const actionGetMaterialSection = (data) => {
  console.log(JSON.stringify(data))
  return dispatch => {
    dispatch({type: types.GET_SECTION_START})
    return axios.post(`${GLOBAL.API_HOST}/getSectionDetails`, data)
    .then(res => {
      console.log(res)
      if(res.data.status === 200){
        dispatch({type: types.GET_SECTION_SUCCESS, payload: res.data.data})
      }else{
        dispatch({type: types.GET_SECTION_FAILURE, payload: res.data.message})
      }
    })
    .catch(err => {
      dispatch({type: types.GET_SECTION_FAILURE, payload: err})
    })
  }
}
