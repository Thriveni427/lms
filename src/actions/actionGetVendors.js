import * as types from './../constants/actionTypes';
import axios from 'axios';
import * as GLOBAL from '../utils/index';
import { toast } from "react-toastify";

export const actionGetVendors = (data) => {
  return dispatch => {
    console.log(JSON.stringify(data))
    dispatch({type: types.GET_VENDOR_DETAILS_START})
    return axios.get(`${GLOBAL.API_HOST}/vendorDetails`)
    .then(res => {
      console.log(res);
      if(res.data.status === 200){
        //toast.success(res.data.message);
        dispatch({type: types.GET_VENDOR_DETAILS_SUCCESS, payload: res.data.data})
      }else{
        dispatch({type: types.GET_VENDOR_DETAILS_FAILURE, payload: res.data.statusMessage})
        toast.error(res.data.message);
      }
    })
    .catch(err => {
      dispatch({type: types.GET_VENDOR_DETAILS_FAILURE, payload: err})
    })
  }
}

export const actionEditUserDetails = (data) => {
  return dispatch => {
    // console.log(JSON.stringify(data))
    dispatch({type: types.EDIT_USER_DETAILS_START})
    return axios.post(`${GLOBAL.API_HOST}/editUserDetails`,data)
    .then(res => {
      console.log(res);
      if(res.data.status === 200){
        toast.success(res.data.message);
        dispatch({type: types.EDIT_USER_DETAILS_SUCCESS, payload: res.data.data})
      }else{
        dispatch({type: types.EDIT_USER_DETAILS_FAILURE, payload: res.data.statusMessage})
        toast.error(res.data.message);
      }
    })
    .catch(err => {
      dispatch({type: types.EDIT_USER_DETAILS_FAILURE, payload: err})
    })
  }
}