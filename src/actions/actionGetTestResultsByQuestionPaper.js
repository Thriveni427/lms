import * as types from './../constants/actionTypes';
// import { toast } from "react-toastify";
import axios from 'axios';
import * as GLOBAL from '../utils/index';

export const actionGetTestResultsByQuestionPaper = (data) => {
  return dispatch => {
    dispatch({type: types.GET_TEST_RESULT_BY_QUESTION_PAPER_LIST_START})
    return axios.get(`${GLOBAL.API_HOST}/getTestResultsByQuestionPaper?topicID=${data.topicID}&userID=${data.userID}`)
    .then(res => {
      console.log(res);
      if(res.data.status === 200){
        dispatch({type: types.GET_TEST_RESULT_BY_QUESTION_PAPER_LIST_SUCCESS, payload: res.data.data})
      }else{
        dispatch({type: types.GET_TEST_RESULT_BY_QUESTION_PAPER_LIST_FAILURE, payload: res.data.message})
      }
    })
    .catch(err => {
      dispatch({type: types.GET_TEST_RESULT_BY_QUESTION_PAPER_LIST_FAILURE, payload: err})
    })
  }
}
