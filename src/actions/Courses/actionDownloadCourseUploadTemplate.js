import * as types from './../../constants/actionTypes';
// import { toast } from "react-toastify";
import axios from 'axios';
import * as GLOBAL from '../../utils/index';

// console.log(types.LOGIN_FAILURE)
export const actionDownloadCourseUploadTemplate = () => {
  return dispatch => {
    //console.log(JSON.stringify(data))
    dispatch({type: types.DOWNLOAD_COURSE_UPLOAD_TEMPLATE_START})
    return axios.get(`${GLOBAL.API_HOST}/downloadCourseUploadTemplate`)
    .then(res => {
      console.log(res);
      //console.log(data)
      if(res.data.status === 200){
        // toast.success(res.data.message);
        dispatch({type: types.DOWNLOAD_COURSE_UPLOAD_TEMPLATE_SUCCESS, payload: res.data})
      }
      else{
        dispatch({type: types.DOWNLOAD_COURSE_UPLOAD_TEMPLATE_FAILURE, payload: res.data})
        // toast.error(res.data.message);
      }
    })
    .catch(err => {
      dispatch({type: types.DOWNLOAD_COURSE_UPLOAD_TEMPLATE_FAILURE, payload: err})
    })
  }
}
