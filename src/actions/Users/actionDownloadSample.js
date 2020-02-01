import * as types from './../../constants/actionTypes';
import { toast } from "react-toastify";
import axios from 'axios';
import * as GLOBAL from '../../utils/index';

// console.log(types.LOGIN_FAILURE)
export const actionDownloadSample = () => {
  return dispatch => {
    //console.log(JSON.stringify(data))
    dispatch({type: types.BULK_UPLOAD_START})
    return axios.get(`${GLOBAL.API_HOST}/downloadSampleCSV`)
    .then(res => {
      console.log(res);
      //console.log(data)
      if(res.data.status === 200){
        toast.success(res.data.message);
        dispatch({type: types.BULK_UPLOAD_SUCCESS, payload: res.data.data})
      }else{
        dispatch({type: types.BULK_UPLOAD_FAILURE, payload: res.data.message})
        toast.error(res.data.message);
      }
    })
    .catch(err => {
      dispatch({type: types.BULK_UPLOAD_FAILURE, payload: err})
    })
  }
}
