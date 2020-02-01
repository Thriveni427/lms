import * as types from '../constants/actionTypes';
import { toast } from "react-toastify";
import axios from 'axios';
import * as GLOBAL from '../utils/index';

// console.log(types.LOGIN_FAILURE)
export const actionGetBatchById = (data) => {
  return dispatch => {
    console.log(JSON.stringify(data))
    dispatch({type: types.GET_BATCH_LIST_BY_ID_START})
    return axios.get(`${GLOBAL.API_HOST}/getBatchDetailsById?batchID=${data}`)
    .then(res => {
      console.log(res);
      console.log(data)
      if(res.data.status === 200){
        // toast.success(res.data.message);
        dispatch({type: types.GET_BATCH_LIST_BY_ID_SUCCESS, payload: res.data.data})
      }else{
        dispatch({type: types.GET_BATCH_LIST_BY_ID_FAILURE, payload: res.data.message})
        // toast.error(res.data.message);
      }
    })
    .catch(err => {
      dispatch({type: types.GET_BATCH_LIST_BY_ID_FAILURE, payload: err})
    })
  }
}
