import * as types from './../constants/actionTypes';
// import { toast } from "react-toastify";
import axios from 'axios';
import * as GLOBAL from '../utils/index';

// console.log(types.LOGIN_FAILURE)
export const actionSetFavoriteIcon = (data) => {
  return dispatch => {
    console.log(JSON.stringify(data))
    dispatch({ type: types.SET_FAVORITE_START })
    return axios.post(`${GLOBAL.API_HOST}/setFavorite`, data)
      .then(res => {
        console.log(res);
        if (res.data.status === 200) {
          // toast.success(res.data.message);
          dispatch({ type: types.SET_FAVORITE_SUCCESS, payload: res.data.data })
        } else {
          dispatch({ type: types.SET_FAVORITE_FAILURE, payload: res.data.message })
          // toast.error(res.data.message);
        }
      })
      .catch(err => {
        dispatch({ type: types.SET_FAVORITE_FAILURE, payload: err })
      })
  }
}
