import * as types from './../constants/actionTypes';
import axios from 'axios';
import * as GLOBAL from '../utils/index';
import { toast } from "react-toastify";

export const actionGetUserDetails = () => {
  return dispatch => {
    // console.log(JSON.stringify(data))
    dispatch({type: types.GET_USER_DETAILS_START})
    return axios.get(`${GLOBAL.API_HOST}/usersDetails`)
    .then(res => {
      console.log(res);
      if(res.data.status === 200){
        //toast.success(res.data.message);
        dispatch({type: types.GET_USER_DETAILS_SUCCESS, payload: res.data.data})
      }else{
        dispatch({type: types.GET_USER_DETAILS_FAILURE, payload: res.data.statusMessage})
        toast.error(res.data.message);
      }
    })
    .catch(err => {
      dispatch({type: types.GET_USER_DETAILS_FAILURE, payload: err})
    })
  }
}

export const actionGetUserDetailsByVendor = (data) => {
    return dispatch => {
      //console.log(data);
      dispatch({type: types.GET_USER_DETAILS_START})
      return axios.get(`${GLOBAL.API_HOST}/getUsersByVendor?vendorID=`+data)
      .then(res => {
        console.log(res);
        if(res.data.status === 200){
          //toast.success(res.data.message);
          dispatch({type: types.GET_USER_DETAILS_SUCCESS, payload: res.data.data})
        }else{
          dispatch({type: types.GET_USER_DETAILS_FAILURE, payload: res.data.statusMessage})
          toast.error(res.data.message);
        }
      })
      .catch(err => {
        dispatch({type: types.GET_USER_DETAILS_FAILURE, payload: err})
      })
    }
  }

  export const actionGetUserDetailsByRole = (data) => {
    return dispatch => {
      console.log(data);
      dispatch({type: types.GET_USER_DETAILS_START})
      return axios.get(`${GLOBAL.API_HOST}/getUsersByRole?vendorID=${data.vendorID}&roleID=${data.roleID}`)
      .then(res => {
        console.log(res);
        if(res.data.status === 200){
          //toast.success(res.data.message);
          dispatch({type: types.GET_USER_DETAILS_SUCCESS, payload: res.data.data})
        }else{
          dispatch({type: types.GET_USER_DETAILS_FAILURE, payload: res.data.statusMessage})
          toast.error(res.data.message);
        }
      })
      .catch(err => {
        dispatch({type: types.GET_USER_DETAILS_FAILURE, payload: err})
      })
    }
  }

export const actionEditUserDetails = (data) => {
  return dispatch => {
    // console.log(JSON.stringify(data))
    dispatch({type: types.EDIT_USER_DETAILS_START})
    return axios.post(`${GLOBAL.API_HOST}/editUserDetails`,data)
    .then(res => {
      console.log(res.data);
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