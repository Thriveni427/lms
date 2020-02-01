import * as types from './../../constants/actionTypes';
// import { toast } from "react-toastify";
import axios from 'axios';
import * as GLOBAL from '../../utils/index';

// console.log(types.LOGIN_FAILURE)
export const actionGetMaterialByTopic = (data) => {
  return dispatch => {
    console.log(JSON.stringify(data))
    dispatch({type: types.GET_MATERIAL_BY_TOPIC_START})
    return axios.get(`${GLOBAL.API_HOST}/getCourseMaterialsByTopic?courseID=${data.courseID}&topicID=${data.topicID}`)
    .then(res => {
      console.log(res);
      //console.log(data)
      dispatch({type: types.GET_MATERIAL_BY_TOPIC_SUCCESS, payload: res.data.data})

      // if(res.data.status === 200){
      //   // toast.success(res.data.message);
      //   dispatch({type: types.GET_MATERIAL_BY_TOPIC_SUCCESS, payload: res.data.data})
      // }
      // else{
      //   dispatch({type: types.GET_MATERIAL_BY_TOPIC_FAILURE, payload: res.data})
      //   // toast.error(res.data.message);
      // }
    })
    .catch(err => {
      dispatch({type: types.GET_MATERIAL_BY_TOPIC_FAILURE, payload: err})
    })
  }
}
