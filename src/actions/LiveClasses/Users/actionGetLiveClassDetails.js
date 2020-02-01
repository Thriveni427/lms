import * as types from './../../../constants/actionTypes';
import axios from 'axios';
import * as GLOBAL from '../../../utils/index';
import { toast } from "react-toastify";

export const actionGetLiveClassDetails = (data) => {
  return dispatch => {
    console.log(JSON.stringify(data))
    dispatch({type: types.GET_LIVE_CLASS_DETAILS_START})
    return axios.get(`${GLOBAL.API_HOST}/getLiveClassDetailsByID?liveClassID=${data}`)
    .then(res => {
      console.log(res);
      if(res.data.status === 200){
        //toast.success(res.data.message);
        dispatch({type: types.GET_LIVE_CLASS_DETAILS_SUCCESS, payload: res.data.data})
      }else{
        dispatch({type: types.GET_LIVE_CLASS_DETAILS_FAILURE, payload: res.data.statusMessage})
        toast.error(res.data.message);
      }
    })
    .catch(err => {
      dispatch({type: types.GET_LIVE_CLASS_DETAILS_FAILURE, payload: err})
    })
  }
}