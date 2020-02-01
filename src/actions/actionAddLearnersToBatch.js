import * as types from '../constants/actionTypes';
import { toast } from "react-toastify";
import axios from 'axios';
import * as GLOBAL from '../utils/index';

export const actionAddLearnersToBatch = (data) => {
  return dispatch => {
    // console.log(JSON.stringify(data))
    dispatch({type: types.ASSIGN_BATCH_START})
    return axios.put(`${GLOBAL.API_HOST}/updateUsersToBatch`, data)
    .then(res => {
      console.log(res);
      if(res.data.status === 200){
        toast.success(res.data.message);
        dispatch({type: types.ASSIGN_BATCH_SUCCESS, payload: res.data.data})
      }else{
        dispatch({type: types.ASSIGN_BATCH_FAILURE, payload: res.data.message})
        toast.error(res.data.message);
      }
    })
    .catch(err => {
      dispatch({type: types.ASSIGN_BATCH_FAILURE, payload: err})
    })
  }
}
