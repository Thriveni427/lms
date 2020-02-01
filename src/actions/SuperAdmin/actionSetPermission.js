import * as types from '../../constants/actionTypes';
import axios from 'axios';
import * as GLOBAL from '../../utils/index';
import { toast } from "react-toastify";

export const actionSetPermission = (data) => {
    return dispatch => {
      // console.log(JSON.stringify(data))
      dispatch({type: types.SET_PERMISSION_START})
      return axios.post(`${GLOBAL.API_HOST}/deleteQuestion`,data)
      .then(res => {
        console.log(res);
        if(res.data.status === 200){
          toast.success(res.data.message);
          dispatch({type: types.SET_PERMISSION_SUCCESS, payload: res.data.data})
        }else{
          dispatch({type: types.SET_PERMISSION_FAILURE, payload: res.data.statusMessage})
          toast.error(res.data.message);
        }
      })
      .catch(err => {
        dispatch({type: types.SET_PERMISSION_FAILURE, payload: err})
      })
    }
  }