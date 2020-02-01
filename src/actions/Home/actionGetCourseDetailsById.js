import * as types from '../../constants/actionTypes';
import { toast } from "react-toastify";
import axios from 'axios';
import * as GLOBAL from '../../utils/index';

// console.log(types.LOGIN_FAILURE)
export const actionGetCourseDetailsById = (data) => {
  return dispatch => {
    // console.log(JSON.stringify(data))
    dispatch({ type: types.GET_COURSE_DETAILS_START })
    return axios.get(`${GLOBAL.API_HOST}/courseDetailsByID?courseID=${data.courseID}`)
      .then(res => {
        console.log(res);
        //console.log(data)
        if (res.data.status === 200) {
          toast.success(res.data.message);
          dispatch({ type: types.GET_COURSE_DETAILS_SUCCESS, payload: res.data.data })
        } else {
          dispatch({ type: types.GET_COURSE_DETAILS_FAILURE, payload: res.data.message })
          toast.error(res.data.message);
        }
      })
      .catch(err => {
        dispatch({ type: types.GET_COURSE_DETAILS_FAILURE, payload: err })
      })
  }
}
