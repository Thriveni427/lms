import * as types from './../constants/actionTypes';
import { toast } from "react-toastify";
import axios from 'axios';
import * as GLOBAL from '../utils/index';

// console.log(types.LOGIN_FAILURE)
export const actionCreateQuestionMcq = (data) => {
  return dispatch => {
    console.log(JSON.stringify(data))
    dispatch({type: types.CREATE_QUESTION_MCQ_START})
    return axios.post(`${GLOBAL.API_HOST}/createQuestion`, data)
    .then(res => {
      console.log(res);
      if(res.data.status === 200){
        toast.success(res.data.message);
        dispatch({type: types.CREATE_QUESTION_MCQ_SUCCESS, payload: res.data.data})
      }else{
        dispatch({type: types.CREATE_QUESTION_MCQ_FAILURE, payload: res.data.message})
        toast.error(res.data.message);
      }
    })
    .catch(err => {
      dispatch({type: types.CREATE_QUESTION_MCQ_FAILURE, payload: err})
    })
  }
}

export const handleShowMcq = () => dispatch => {
    console.log("SHOW_MCQ dispatched");
    
  dispatch({ type: types.SHOW_MCQ });
};

export const handleShowEssay = () => dispatch => {
  dispatch({ type: types.SHOW_ESSAY });
};

export const handleShowFillBlank = () => dispatch => {
  dispatch({ type: types.SHOW_FILL_BLANK });
};

export const handleShowTrueFalse = () => dispatch => {    
    dispatch({ type: types.SHOW_TRUE_FALSE });
};

export const handleShowMatch = () => dispatch => {    
    dispatch({ type: types.SHOW_MATCH });
};
