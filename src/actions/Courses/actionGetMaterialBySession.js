import * as types from './../../constants/actionTypes';
// import { toast } from "react-toastify";
import axios from 'axios';
import * as GLOBAL from '../../utils/index';

// console.log(types.LOGIN_FAILURE)
export const actionGetMaterialBySession = (data) => {
  return dispatch => {
    console.log(JSON.stringify(data))
    dispatch({type: types.GET_MATERIAL_BY_SESSION_START})
    return axios.post(`${GLOBAL.API_HOST}/getCourseMaterialsBySession`, data)
    .then(res => {
      console.log(res);
      //console.log(data)
      dispatch({type: types.GET_MATERIAL_BY_SESSION_SUCCESS, payload: res.data.data})

      // if(res.data.status === 200){
      //   // toast.success(res.data.message);
      //   dispatch({type: types.GET_MATERIAL_BY_SESSION_SUCCESS, payload: res.data.data})
      // }
      // else{
      //   dispatch({type: types.GET_MATERIAL_BY_SESSION_FAILURE, payload: res.data})
      //   // toast.error(res.data.message);
      // }
    })
    .catch(err => {
      dispatch({type: types.GET_MATERIAL_BY_SESSION_FAILURE, payload: err})
    })
  }
}
