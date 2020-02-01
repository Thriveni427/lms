import * as types from './../../../constants/actionTypes';
import axios from 'axios';
import * as GLOBAL from '../../../utils/index';
import { toast } from "react-toastify";

export const actionGamifications = (data) => {
  return dispatch => {
    console.log(JSON.stringify(data))
    dispatch({type: types.GAMIFICATION_START})
    return axios.get(`${GLOBAL.API_HOST}/`)
    .then(res => {
      console.log(res);
      if(res.data.status === 200){
        //toast.success(res.data.message);
        dispatch({type: types.GAMIFICATION_SUCCESS, payload: res.data.data})
      }else{
        dispatch({type: types.GAMIFICATION_FAILURE, payload: res.data.statusMessage})
        toast.error(res.data.message);
      }
    })
    .catch(err => {
      dispatch({type: types.GAMIFICATION_FAILURE, payload: err})
    })
  }
}

export const actionEditGamifications = (data) => {
    return dispatch => {
      console.log(JSON.stringify(data))
      dispatch({type: types.EDIT_GAMIFICATION_START})
      return axios.post(`${GLOBAL.API_HOST}/`,data)
      .then(res => {
        console.log(res);
        if(res.data.status === 200){
          toast.success(res.data.message);
          dispatch({type: types.EDIT_GAMIFICATION_SUCCESS, payload: res.data.data})
        }else{
          dispatch({type: types.EDIT_GAMIFICATION_FAILURE, payload: res.data.message})
          toast.error(res.data.message);
        }
      })
      .catch(err => {
        dispatch({type: types.EDIT_GAMIFICATION_FAILURE, payload: err})
      })
    }
  }

export const actionDeleteGamifications = (data) => {
  return dispatch => {
    console.log(JSON.stringify(data))
    dispatch({type: types.DELETE_GAMIFICATION_START})
    return axios.post(`${GLOBAL.API_HOST}/`,data)
    .then(res => {
      console.log(res);
      if(res.data.status === 200){
        toast.success(res.data.message);
        dispatch({type: types.DELETE_GAMIFICATION_SUCCESS, payload: res.data.data})
      }else{
        dispatch({type: types.DELETE_GAMIFICATION_FAILURE, payload: res.data.message})
        toast.error(res.data.message);
      }
    })
    .catch(err => {
      dispatch({type: types.DELETE_GAMIFICATION_FAILURE, payload: err})
    })
  }
}