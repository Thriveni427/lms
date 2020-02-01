import * as types from "../../../constants/actionTypes";
import axios from "axios";
import * as GLOBAL from "../../../utils/index";

export const actionJoinCourse = data => {
  console.log(data);
  return dispatch => {
    dispatch({ type: types.JOIN_COURSE_START });
    return axios.post(`${GLOBAL.API_HOST}/joinCourse`, data)
      .then(res => {
        console.log(res);
        if (res.data.status === 200) {
          dispatch({
            type: types.JOIN_COURSE_SUCCESS,
            payload: res.data.data
          });
        } else {
          dispatch({
            type: types.JOIN_COURSE_FAILURE,
            payload: res.data.message
          });
        }
      })
      .catch(err => {
        dispatch({ type: types.JOIN_COURSE_FAILURE, payload: err });
      });
  };
};
