import * as types from './../../constants/actionTypes';
// import { toast } from "react-toastify";
import axios from 'axios';
import * as GLOBAL from '../../utils/index';

// console.log(types.LOGIN_FAILURE)
export const actionGetFirstMaterialByCourse = (data) => {
  return dispatch => {
    console.log(JSON.stringify(data))
    dispatch({type: types.GET_FIRST_MATERIAL_BY_COURSE_START})
    return axios.post(`${GLOBAL.API_HOST}/getFirstMaterialByCourseID`, data)
    .then(res => {
      console.log(res);
      //console.log(data)
      if(res.data.status === 200){
        // toast.success(res.data.message);
        dispatch({type: types.GET_FIRST_MATERIAL_BY_COURSE_SUCCESS, payload: res.data.data})
      }else{
        dispatch({type: types.GET_FIRST_MATERIAL_BY_COURSE_FAILURE, payload: res.data.message})
        // toast.error(res.data.message);
      }
    })
    .catch(err => {
      dispatch({type: types.GET_FIRST_MATERIAL_BY_COURSE_FAILURE, payload: err})
    })
  }
}
