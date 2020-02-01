import * as types from './../constants/actionTypes';
import { toast } from "react-toastify";
import axios from 'axios';
import * as GLOBAL from '../utils/index';

// console.log(types.LOGIN_FAILURE)
export const actionGetQuestions = (data) => {
  return dispatch => {
    //console.log(JSON.stringify(data))
    dispatch({type: types.GET_QUESTION_LIST_START})
    return axios.post(`${GLOBAL.API_HOST}/getQuestionDetails`,data)
    .then(res => {
      console.log(res.data);
      //console.log(data)
      if(res.data.status === 200){
        //toast.success(res.data.message);
        dispatch({type: types.GET_QUESTION_LIST_SUCCESS, payload: res.data.data})
      }else{
        dispatch({type: types.GET_QUESTION_LIST_FAILURE, payload: res.data.message})
        toast.error(res.data.message);
      }
    })
    .catch(err => {
      dispatch({type: types.GET_QUESTION_LIST_FAILURE, payload: err})
    })
  }
}
