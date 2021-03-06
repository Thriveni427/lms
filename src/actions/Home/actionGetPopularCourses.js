import * as types from "./../../constants/actionTypes";
import axios from "axios";
import * as GLOBAL from "../../utils/index";
// import { toast } from "react-toastify";

export const actionGetPopularCourses = () => {
  return dispatch => {
    // console.log(JSON.stringify(data))
    dispatch({ type: types.GET_POPULAR_COURSES_LIST_START });
    return axios
      .get(`${GLOBAL.API_HOST}/getPopularCourses?limit=20`)
      .then(res => {
        console.log(res);
        if (res.data.status === 200) {
          //toast.success(res.data.message);
          dispatch({
            type: types.GET_POPULAR_COURSES_LIST_SUCCESS,
            payload: res.data.data
          });
        } else {
          dispatch({
            type: types.GET_POPULAR_COURSES_LIST_FAILURE,
            payload: res.data.statusMessage
          });
          // toast.error(res.data.message);
        }
      })
      .catch(err => {
        dispatch({
          type: types.GET_POPULAR_COURSES_LIST_FAILURE,
          payload: err
        });
      });
  };
};
