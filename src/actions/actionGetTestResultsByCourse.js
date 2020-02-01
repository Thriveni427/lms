import * as types from './../constants/actionTypes';
// import { toast } from "react-toastify";
import axios from 'axios';
import * as GLOBAL from '../utils/index';

export const actionGetTestResultsByCourse = (data) => {
  return dispatch => {
    dispatch({type: types.GET_TEST_RESULT_BY_COURSE_START})
    return axios.get(`${GLOBAL.API_HOST}/getTestResultsByCourse?courseID=${data.courseID}&userID=${data.userID}`)
    .then(res => {
      console.log(res);
      if(res.data.status === 200){
        dispatch({type: types.GET_TEST_RESULT_BY_COURSE_SUCCESS, payload: res.data.data})
      }else{
        dispatch({type: types.GET_TEST_RESULT_BY_COURSE_FAILURE, payload: res.data.message})
      }
    })
    .catch(err => {
      dispatch({type: types.GET_TEST_RESULT_BY_COURSE_FAILURE, payload: err})
    })
  }
}
