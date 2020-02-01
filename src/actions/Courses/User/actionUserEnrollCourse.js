import * as types from "../../../constants/actionTypes";
import axios from "axios";
import * as GLOBAL from "../../../utils/index";

export const actionUserEnrollCourse = data => {
  return dispatch => {
    dispatch({ type: types.ADD_USER_ENROLL_COURCE_START });
    return axios
      .post(`${GLOBAL.API_HOST}/enrollCourse`, data)
      .then(res => {
        console.log(res);
        if (res.data.status === 200) {
          dispatch({
            type: types.ADD_USER_ENROLL_COURCE_SUCCESS,
            payload: res.data.data
          });
        } else {
          dispatch({
            type: types.ADD_USER_ENROLL_COURCE_FAILURE,
            payload: res.data.message
          });
        }
      })
      .catch(err => {
        dispatch({ type: types.ADD_USER_ENROLL_COURCE_FAILURE, payload: err });
      });
  };
};
