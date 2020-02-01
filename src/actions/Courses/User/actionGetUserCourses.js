import * as types from './../../../constants/actionTypes';
// import { toast } from "react-toastify";
import axios from 'axios';
import * as GLOBAL from '../../../utils/index';


export const handleAllCourse = () => dispatch => {
    dispatch({ type: types.SHOW_ALL_COURSE });
};

export const handleAssignedCourse = () => dispatch => {
    dispatch({ type: types.SHOW_ASSIGNED_COURSE });
};

export const handleRecommendedCourse = () => dispatch => {
    dispatch({ type: types.SHOW_RECOMMENDED_COURSE });
};

export const hideAllCourse = () => dispatch => {
    dispatch({ type: types.HIDE_ALL_COURSE });
};

export const hideAssignedCourse = () => dispatch => {
    dispatch({ type: types.HIDE_ASSIGNED_COURSE });
};

export const hideRecommendedCourse = () => dispatch => {
    dispatch({ type: types.HIDE_RECOMMENDED_COURSE });
};

// console.log(types.LOGIN_FAILURE)
export const actionGetAssignedCourses = (data) => {
  return dispatch => {
    console.log(data);
    dispatch({type: types.GET_ASSIGNED_COURSES_START})
    //  /deleteCourseMaterial/?materialID=5
    return axios.get(`${GLOBAL.API_HOST}/getAssignedCourses?userID=${data}` )
    .then(res => {
      if(res.data.status === 200 ){
        dispatch({type: types.GET_ASSIGNED_COURSES_SUCCESS, payload: res.data.data})
      }
      else if(res.data.status === 400){
        dispatch({type: types.GET_ASSIGNED_COURSES_SUCCESS, payload: []})
        // toast.warn(res.data.message);
      }
      else{
        dispatch({type: types.GET_ASSIGNED_COURSES_FAILURE, payload: res.data.message})
        // toast.error(res.data.message);
      }
    })
    .catch(err => {
      dispatch({type: types.GET_ASSIGNED_COURSES_FAILURE, payload: err})
    })
  }
}

export const actionGetAllCourses = () => {
    return dispatch => {
      // console.log(JSON.stringify(data))
      dispatch({type: types.GET_ALL_COURSES_START})
      return axios.get(`${GLOBAL.API_HOST}/courseDetails`)
      .then(res => {
        console.log(res);
        if(res.data.status === 200){
          dispatch({type: types.GET_ALL_COURSES_SUCCESS, payload: res.data.data})
        }else{
          dispatch({type: types.GET_ALL_COURSES_FAILURE, payload: res.data.statusMessage})
        }
      })
      .catch(err => {
        dispatch({type: types.GET_ALL_COURSES_FAILURE, payload: err})
      })
    }
  }
