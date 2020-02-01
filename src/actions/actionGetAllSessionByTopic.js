import * as types from '../constants/actionTypes';
import axios from 'axios';
import * as GLOBAL from '../utils/index';
import { toast } from "react-toastify";

export const actionGetAllSessionByTopic = (data) => {
  return dispatch => {
    // console.log(JSON.stringify(data))
    dispatch({type: types.GET_ALL_SESSION_BY_TOPIC_START})
    return axios.get(`${GLOBAL.API_HOST}/getAllSessionByTopic?topicID=${data.topicID}&courseID=${data.courseID}`)
    .then(res => {
      console.log(res);
      if(res.data.status === 200){
        //toast.success(res.data.message);
        dispatch({type: types.GET_ALL_SESSION_BY_TOPIC_SUCCESS, payload: res.data.data})
      }else{
        dispatch({type: types.GET_ALL_SESSION_BY_TOPIC_FAILURE, payload: res.data.statusMessage})
        toast.error(res.data.message);
      }
    })
    .catch(err => {
      dispatch({type: types.GET_ALL_SESSION_BY_TOPIC_FAILURE, payload: err})
    })
  }
}