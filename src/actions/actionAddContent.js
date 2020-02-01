import * as types from './../constants/actionTypes';
import { toast } from "react-toastify";
import axios from 'axios';
import * as GLOBAL from '../utils/index';

// console.log(types.LOGIN_FAILURE)
export const actionAddContent = (data) => {
  return dispatch => {
    console.log(JSON.stringify(data))
    dispatch({type: types.ADD_CONTENT_START})
    return axios.post(`${GLOBAL.API_HOST}/createMaterialContent`, data)
    .then(res => {
      console.log(res.data);
      //console.log(data)
      if(res.data.status === 200){
        toast.success("Content Uploaded Successfully");
        dispatch({type: types.ADD_CONTENT_SUCCESS, payload: res.data.data})
      }else{
        dispatch({type: types.ADD_CONTENT_FAILURE, payload: res.data.message})
        toast.error(res.data.message);
      }
    })
    .catch(err => {
      dispatch({type: types.ADD_CONTENT_FAILURE, payload: err})
    })
  }
}
