
import * as types from '../../constants/actionTypes';
// import { toast } from "react-toastify";
import axios from 'axios';
import * as GLOBAL from '../../utils/index';

export const actionAddCourseToWishList = (data) => {
  return dispatch => {
    console.log(JSON.stringify(data))
    dispatch({ type: types.ADD_COURSE_TO_WISH_LIST_START })
    return axios.post(`${GLOBAL.API_HOST}/addCourseToWishList`, data)
      .then(res => {
        console.log(res.data);
        console.log(data)
        if (res.data.status === 200) {
          // toast.success("Added to wish list Successfully");
          dispatch({ type: types.ADD_COURSE_TO_WISH_LIST_SUCCESS, payload: res.data.data })
        } else {
          dispatch({ type: types.ADD_COURSE_TO_WISH_LIST_FAILURE, payload: res.data.message })
          // toast.error(res.data.message);
        }
      })
      .catch(err => {
        dispatch({ type: types.ADD_COURSE_TO_WISH_LIST_FAILURE, payload: err })
      })
  }
}
