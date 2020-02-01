import * as types from './../constants/actionTypes';
import axios from 'axios';
import * as GLOBAL from '../utils/index';
import { toast } from "react-toastify";

export const actionGetCourseList = () => {
  return dispatch => {
    // console.log(JSON.stringify(data))
    dispatch({type: types.GET_COURSE_LIST_START})
    return axios.get(`${GLOBAL.API_HOST}/courseDetails`)
    .then(res => {
      console.log(res);
      if(res.data.status === 200){
        dispatch({type: types.GET_COURSE_LIST_SUCCESS, payload: res.data.data})
      }else{
        dispatch({type: types.GET_COURSE_LIST_FAILURE, payload: res.data.statusMessage})
      }
    })
    .catch(err => {
      dispatch({type: types.GET_COURSE_LIST_FAILURE, payload: err})
    })
  }
}

export const actionEditCourse = (data) => {
    return dispatch => {
      console.log(JSON.stringify(data))
      dispatch({type: types.EDIT_COURSE_START})
      return axios.post(`${GLOBAL.API_HOST}/editCourse`, data)
      .then(res => {
        console.log(res);
        if(res.data.status === 200){
          toast.success(res.data.message);
          toast.info("Redirecting...");
          dispatch({type: types.EDIT_COURSE_SUCCESS, payload: res.data.data})
        }else{
          dispatch({type: types.EDIT_COURSE_FAILURE, payload: res.data.message})
          toast.error(res.data.message);
        }
      })
      .catch(err => {
        dispatch({type: types.EDIT_COURSE_FAILURE, payload: err})
      })
    }
  }

// export const actionEditCourseList = (data) => {
//   return dispatch => {
//     // console.log(JSON.stringify(data))
//     dispatch({type: types.EDIT_USER_DETAILS_START})
//     return axios.post(`${GLOBAL.API_HOST}/editUserDetails`,data)
//     .then(res => {
//       console.log(res);
//       if(res.data.status === 200){
//         toast.success(res.data.message);
//         dispatch({type: types.EDIT_USER_DETAILS_SUCCESS, payload: res.data.data})
//       }else{
//         dispatch({type: types.EDIT_USER_DETAILS_FAILURE, payload: res.data.statusMessage})
//         toast.error(res.data.message);
//       }
//     })
//     .catch(err => {
//       dispatch({type: types.EDIT_USER_DETAILS_FAILURE, payload: err})
//     })
//   }
// }