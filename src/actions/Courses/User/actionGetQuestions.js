import * as types from './../../../constants/actionTypes';
import axios from 'axios';
import * as GLOBAL from '../../../utils/index';

export const actionGetQuestions = (data) => {
  return dispatch => {
    dispatch({type: types.GET_QUESTIONS_START})
    return axios.post(`${GLOBAL.API_HOST}/startTest`, data)
    .then(res => {
      console.log(res);
      if(res.data.status === 200){
        dispatch({type: types.GET_QUESTIONS_SUCCESS, payload: res.data.data})
      }else{
        dispatch({type: types.GET_QUESTIONS_FAILURE, payload: res.data.message})
      }
    })
    .catch(err => {
      dispatch({type: types.GET_QUESTIONS_FAILURE, payload: err})
    })
  }
}
