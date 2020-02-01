import * as types from './../../constants/actionTypes';
import { toast } from "react-toastify";
import axios from 'axios';
import * as GLOBAL from '../../utils/index';

// console.log(types.LOGIN_FAILURE)
export const actionDownloadCourseSample = () => {
  return dispatch => {
    //console.log(JSON.stringify(data))
    dispatch({type: types.DOWNLOAD_COURSE_SAMPLE_START})
    return axios.get(`${GLOBAL.API_HOST}/downloadSampleCSV`)
    .then(res => {
      console.log(res);
      //console.log(data)
      if(res.data.status === 200){
        // toast.success(res.data.message);
        dispatch({type: types.DOWNLOAD_COURSE_SAMPLE_SUCCESS, payload: res.data})
      }
      else{
        dispatch({type: types.DOWNLOAD_COURSE_SAMPLE_FAILURE, payload: res.data})
        // toast.error(res.data.message);
      }
    })
    .catch(err => {
      dispatch({type: types.DOWNLOAD_COURSE_SAMPLE_FAILURE, payload: err})
    })
  }
}
