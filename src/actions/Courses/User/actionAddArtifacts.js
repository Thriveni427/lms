
import * as types from './../../../constants/actionTypes';
import { toast } from "react-toastify";
import axios from 'axios';
import * as GLOBAL from '../../../utils/index';

export const actionAddArtifacts = (data) => {
  return dispatch => {
    console.log(JSON.stringify(data))
    dispatch({type: types.ADD_ARTIFACTS_START})
    return axios.post(`${GLOBAL.API_HOST}/createMaterial`, data)
    .then(res => {
      console.log(res.data);
      //console.log(data)
      if(res.data.status === 200){
        toast.success("Artifacts Uploaded Successfully");
        dispatch({type: types.ADD_ARTIFACTS_SUCCESS, payload: res.data.data})
      }else{
        dispatch({type: types.ADD_ARTIFACTS_FAILURE, payload: res.data.message})
        toast.error(res.data.message);
      }
    })
    .catch(err => {
      dispatch({type: types.ADD_ARTIFACTS_FAILURE, payload: err})
    })
  }
}
