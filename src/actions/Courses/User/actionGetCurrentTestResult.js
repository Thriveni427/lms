import * as types from './../../../constants/actionTypes';
// import { toast } from "react-toastify";
import axios from 'axios';
import * as GLOBAL from '../../../utils/index';

export const actionGetCurrentTestResult = (data) => {
  return dispatch => {
    dispatch({ type: types.GET_CURRENT_TEST_RESULT_START })
    return axios.get(`${GLOBAL.API_HOST}/getCurrentTestResult?testID=${data.testId}&userID=${data.userId}`)
      .then(res => {
        console.log(res);
        if (res.data.status === 200) {
          dispatch({ type: types.GET_CURRENT_TEST_RESULT_SUCCESS, payload: res.data.data })
        } else {
          dispatch({ type: types.GET_CURRENT_TEST_RESULT_FAILURE, payload: res.data.message })
        }
      })
      .catch(err => {
        dispatch({ type: types.GET_CURRENT_TEST_RESULT_FAILURE, payload: err })
      })
  }
}
