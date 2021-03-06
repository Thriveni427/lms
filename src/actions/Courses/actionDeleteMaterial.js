import * as types from './../../constants/actionTypes';
import { toast } from "react-toastify";
import axios from 'axios';
import * as GLOBAL from '../../utils/index';

// console.log(types.LOGIN_FAILURE)
export const actionDeleteMaterial = (data) => {
  return dispatch => {
    console.log(JSON.stringify(data))
    dispatch({type: types.DELETE_MATERIAL_START})
    //  /deleteCourseMaterial/?materialID=5
    return axios.delete(`${GLOBAL.API_HOST}/deleteCourseMaterial/?materialID=${data}` )
    .then(res => {
      console.log(res);
      console.log(data)
      if(res.data.status === 200){
        toast.success(res.data.message);
        dispatch({type: types.DELETE_MATERIAL_SUCCESS, payload: res.data.data})
      }else{
        dispatch({type: types.DELETE_MATERIAL_FAILURE, payload: res.data.message})
        toast.error(res.data.message);
      }
    })
    .catch(err => {
      dispatch({type: types.DELETE_MATERIAL_FAILURE, payload: err})
    })
  }
}
