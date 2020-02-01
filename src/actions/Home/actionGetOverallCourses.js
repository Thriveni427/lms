import * as types from "./../../constants/actionTypes";
import axios from "axios";
import * as GLOBAL from "../../utils/index";
// import { toast } from "react-toastify";

export const actionGetOverallCourses = () => {
  return dispatch => {
    // console.log(JSON.stringify(data))
    dispatch({ type: types.GET_COURSE_COUNT_START });
    return axios
      .get(`${GLOBAL.API_HOST}/totalCoursesEnrolledByAdmin`)
      .then(res => {
        console.log(res);
        if (res.data.status === 200) {
          //toast.success(res.data.message);
          dispatch({
            type: types.GET_COURSE_COUNT_SUCCESS,
            payload: res.data.data
          });
        } else {
          dispatch({
            type: types.GET_COURSE_COUNT_FAILURE,
            payload: res.data.statusMessage
          });
          // toast.error(res.data.message);
        }
      })
      .catch(err => {
        dispatch({
          type: types.GET_COURSE_COUNT_FAILURE,
          payload: err
        });
      });
  };
};
