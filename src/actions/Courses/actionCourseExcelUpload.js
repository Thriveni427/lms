import * as types from './../../constants/actionTypes';
import { toast } from "react-toastify";
import axios from 'axios';
import * as GLOBAL from '../../utils/index';


export const actionCourseExcelUpload = (data) => {
  return dispatch => {
    
    dispatch({type: types.UPLOAD_COURSE_EXCEL_START})
    return axios.post(`${GLOBAL.API_HOST}/uploadTemplateEXCEL2`, data)
    .then(res => {
      console.log(res);
      
      if(res.data.status === 200){
        toast.success("Course Uploaded Successfully");
        dispatch({type: types.UPLOAD_COURSE_EXCEL_SUCCESS, payload: res.data})
      }
      else{
        dispatch({type: types.UPLOAD_COURSE_EXCEL_FAILURE, payload: res.data})
        toast.error("Something went wrong");
      }
    })
    .catch(err => {
      dispatch({type: types.UPLOAD_COURSE_EXCEL_FAILURE, payload: err})
    })
  }
}
