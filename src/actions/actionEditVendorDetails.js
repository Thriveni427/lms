import * as types from '../constants/actionTypes';
import axios from 'axios';
import * as GLOBAL from '../utils/index';
import { toast } from "react-toastify";

export const actionEditVendorDetails = (data) => {
    return dispatch => {
      // console.log(JSON.stringify(data))
      dispatch({type: types.EDIT_VENDOR_DETAILS_START})
      return axios.post(`${GLOBAL.API_HOST}/editVendorDetails`,data)
      .then(res => {
        console.log(res);
        if(res.data.status === 200){
          toast.success(res.data.message);
          dispatch({type: types.EDIT_VENDOR_DETAILS_SUCCESS, payload: res.data.data})
        }else{
          dispatch({type: types.EDIT_VENDOR_DETAILS_FAILURE, payload: res.data.statusMessage})
          toast.error(res.data.message);
        }
      })
      .catch(err => {
        dispatch({type: types.EDIT_VENDOR_DETAILS_FAILURE, payload: err})
      })
    }
  }