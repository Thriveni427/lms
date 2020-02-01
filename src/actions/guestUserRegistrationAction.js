import * as types from "../constants/actionTypes";
import { toast } from "react-toastify";
import axios from "axios";
import * as GLOBAL from "../utils/index";

export const guestUserRegistrationAction = data => {
  console.log(data);
  return dispatch => {
    dispatch({ type: types.REGISTER_START });
    return axios
      .post(`${GLOBAL.API_HOST}/guestUserRegistration`, data)
      .then(res => {
        console.log(res);
        if (res.data.status === 200) {
          dispatch({ type: types.REGISTER_SUCCESS, payload: res.data.data });
        } else {
          dispatch({ type: types.REGISTER_FAILURE, payload: res.data.message });
          toast.error(res.data.message);
          console.log(res.data.message);
        }
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: types.REGISTER_FAILURE, payload: err });
      });
  };
};
