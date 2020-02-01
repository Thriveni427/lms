
import * as types from './../../../constants/actionTypes';
import { toast } from "react-toastify";
import axios from 'axios';
import * as GLOBAL from '../../../utils/index';

export const actionGetAllUsers = () => {
  return dispatch => {
    // console.log(JSON.stringify(data))
    dispatch({type: types.GET_ALL_USERS_START})
    return axios.get(`${GLOBAL.API_HOST}/getAllUsers`)
    .then(res => {
      console.log(res);
      if(res.data.status === 200){
        //toast.success(res.data.message);
        dispatch({type: types.GET_ALL_USERS_SUCCESS, payload: res.data.data})
      }else{
        dispatch({type: types.GET_ALL_USERS_FAILURE, payload: res.data.statusMessage})
        toast.error(res.data.message);
      }
    })
    .catch(err => {
      dispatch({type: types.GET_ALL_USERS_FAILURE, payload: err})
    })
  }
}