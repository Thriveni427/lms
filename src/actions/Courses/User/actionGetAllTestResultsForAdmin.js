import * as types from './../../../constants/actionTypes';
// import { toast } from "react-toastify";
import axios from 'axios';
import * as GLOBAL from '../../../utils/index';

export const actionGetAllTestResultsForAdmin = (data) => {

  console.log(data);

  return dispatch => {
    dispatch({ type: types.GET_ALL_TEST_RESULTS_FOR_ADMIN_START })
    return axios.get(`${GLOBAL.API_HOST}/getAllTestResultsForAdmin`, data)
      .then(res => {

        console.log("response for get all test results :", res);

        if (res.data.status === 200) {
          dispatch({ type: types.GET_ALL_TEST_RESULTS_FOR_ADMIN_SUCCESS, payload: res.data.data })
        } else {
          dispatch({ type: types.GET_ALL_TEST_RESULTS_FOR_ADMIN_FAILURE, payload: res.data.message })
        }
      })
      .catch(err => {
        dispatch({ type: types.GET_ALL_TEST_RESULTS_FOR_ADMIN_FAILURE, payload: err })
      })
  }
}
