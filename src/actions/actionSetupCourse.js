import * as types from './../constants/actionTypes';
import { toast } from "react-toastify";
import axios from 'axios';
import * as GLOBAL from '../utils/index';

export const handleAddFolder = () => dispatch => {
  dispatch({ type: types.ENABLE_ADD_FOLDER });
};

export const handleAddFile = () => dispatch => {
  dispatch({ type: types.ENABLE_ADD_FILE });
};

export const handleAddVideo = () => dispatch => {
  dispatch({ type: types.ENABLE_ADD_VIDEO });
};

export const handleAddContent = () => dispatch => {    
    dispatch({ type: types.ENABLE_ADD_CONTENT });
};

export const handleAddAssignment = () => dispatch => {    
    dispatch({ type: types.ENABLE_ADD_ASSIGNMENT });
};

export const handleAddQTest = () => dispatch => {    
    console.log("inside handleAddQTest");
    
    dispatch({ type: types.ENABLE_ADD_Q_TEST });
};

export const handleAddScorm = () => dispatch => {    
    dispatch({ type: types.ENABLE_ADD_SCORM });
};


export const handleHideFolder = () => dispatch => {
    dispatch({ type: types.DISABLE_ADD_FILE });
  };
  
  export const handleHideFile = () => dispatch => {
    dispatch({ type: types.DISABLE_ADD_FILE });
  };
  
  export const handleHideVideo = () => dispatch => {
    dispatch({ type: types.DISABLE_ADD_FILE });
  };
  
  export const handleHideContent = () => dispatch => {    
      dispatch({ type: types.DISABLE_ADD_FILE });
  };
  
  export const handleHideAssignment = () => dispatch => {    
      dispatch({ type: types.DISABLE_ADD_FILE });
  };
  
  export const handleHideQTest = () => dispatch => {    
      dispatch({ type: types.DISABLE_ADD_FILE });
  };
  
  export const handleHideScorm = () => dispatch => {    
      dispatch({ type: types.DISABLE_ADD_FILE });
  };
  

// console.log(types.LOGIN_FAILURE)
export const actionAddQTest = (data) => {
  return dispatch => {
    console.log(JSON.stringify(data))
    dispatch({type: types.ADD_QTEST_START})
    return axios.post(`${GLOBAL.API_HOST}/Registrations`, data)
    .then(res => {
      console.log(res);
      console.log(data)
      if(res.data.status === 200){
        toast.success(res.data.message);
        dispatch({type: types.ADD_QTEST_SUCCESS, payload: res.data.data})
      }else{
        dispatch({type: types.ADD_QTEST_FAILURE, payload: res.data.message})
        toast.error(res.data.message);
      }
    })
    .catch(err => {
      dispatch({type: types.ADD_QTEST_FAILURE, payload: err})
    })
  }
}
