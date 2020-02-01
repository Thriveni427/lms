import * as types from "./../constants/actionTypes";
import { toast } from "react-toastify";
import axios from "axios";
import * as GLOBAL from "../utils/index";

export const loginAction = data => {
  console.log(data);
  return dispatch => {
    dispatch({ type: types.LOGIN_REQUEST });
    return axios
      .post(`${GLOBAL.API_HOST}/Login`, data)
      .then(res => {
        console.log(res);
        if (res.data.status === 200) {
          dispatch({ type: types.LOGIN_SUCCESS, payload: res.data.data });
        } else {
          dispatch({ type: types.LOGIN_FAILURE, payload: res.data.message });
          toast.error(res.data.message);
          console.log(res.data.message);
        }
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: types.LOGIN_FAILURE, payload: err });
      });
  };
};
