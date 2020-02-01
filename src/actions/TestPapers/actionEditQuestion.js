import * as types from '../../constants/actionTypes';
import axios from 'axios';
import * as GLOBAL from '../../utils/index';
import { toast } from "react-toastify";

export const actionEditQuestion = (data) => {
    return dispatch => {
      console.log(JSON.stringify(data))
      dispatch({type: types.EDIT_QUESTION_START})
      return axios.post(`${GLOBAL.API_HOST}/editQuestion`,data)
      .then(res => {
        console.log(res);
        if(res.data.status === 200){
          toast.success(res.data.message);
          dispatch({type: types.EDIT_QUESTION_SUCCESS, payload: res.data.data})
        }else{
          dispatch({type: types.EDIT_QUESTION_FAILURE, payload: res.data.statusMessage})
          toast.error(res.data.message);
        }
      })
      .catch(err => {
        dispatch({type: types.EDIT_QUESTION_FAILURE, payload: err})
      })
    }
  }