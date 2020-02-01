import * as types from './../../constants/actionTypes';
import { toast } from "react-toastify";
import axios from 'axios';
import * as GLOBAL from '../../utils/index';

// console.log(types.LOGIN_FAILURE)
export const actionUploadQuestions = (data) => {
  return dispatch => {
    //console.log(JSON.stringify(data))
    dispatch({type: types.UPLOAD_QUESTIONS_FILE_START})
    return axios.post(`${GLOBAL.API_HOST}/uploadQuestionsFromExcel`, data)
    .then(res => {
      console.log(res);
      //console.log(data)
      if(res.data.status === 200){
        toast.success(res.data.message);
        dispatch({type: types.UPLOAD_QUESTIONS_FILE_SUCCESS, payload: res.data})
      }
      else{
        dispatch({type: types.UPLOAD_QUESTIONS_FILE_FAILURE, payload: res.data})
        // toast.error(res.data.message);
      }
    })
    .catch(err => {
      dispatch({type: types.UPLOAD_QUESTIONS_FILE_FAILURE, payload: err})
    })
  }
}
