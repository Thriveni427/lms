import * as types from './../constants/actionTypes';
import { toast } from "react-toastify";
import axios from 'axios';
import * as GLOBAL from '../utils/index';

// console.log(types.LOGIN_FAILURE)
export const actionEditCategory = (data) => {
  return dispatch => {
    console.log(JSON.stringify(data))
    dispatch({type: types.EDIT_CATEGORY_START})
    return axios.post(`${GLOBAL.API_HOST}/editCategory`, data)
    .then(res => {
      console.log(res);
      if(res.data.status === 200){
        toast.success(res.data.message);
        dispatch({type: types.EDIT_CATEGORY_SUCCESS, payload: res.data.data})
      }else{
        dispatch({type: types.EDIT_CATEGORY_FAILURE, payload: res.data.message})
        toast.error(res.data.message);
      }
    })
    .catch(err => {
      dispatch({type: types.EDIT_CATEGORY_FAILURE, payload: err})
    })
  }
}
