import * as types from './../constants/actionTypes';
import { toast } from "react-toastify";
import axios from 'axios';
import * as GLOBAL from '../utils/index';

export const actionCreateLiveClass = (data) => {
  return dispatch => {
    console.log(JSON.stringify(data))
    dispatch({type: types.CREATE_LIVE_CLASS_START})
    return axios.post(`${GLOBAL.API_HOST}/createLiveClass`, data)
    .then(res => {
      console.log(res);
      if(res.data.status === 200){
        toast.success(res.data.message);
        dispatch({type: types.CREATE_LIVE_CLASS_SUCCESS, payload: res.data.data})
      }else{
        dispatch({type: types.CREATE_LIVE_CLASS_FAILURE, payload: res.data.message})
        toast.error(res.data.message);
      }
    })
    .catch(err => {
      dispatch({type: types.CREATE_LIVE_CLASS_FAILURE, payload: err})
    })
  }
}
