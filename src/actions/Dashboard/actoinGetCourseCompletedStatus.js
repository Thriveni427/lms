import * as types from '../../constants/actionTypes';
// import { toast } from "react-toastify";
import axios from 'axios';
import * as GLOBAL from '../../utils/index';

// console.log(types.LOGIN_FAILURE)
export const actoinGetCourseCompletedStatus = () => {
    return dispatch => {
        // console.log(JSON.stringify(data))
        dispatch({ type: types.GET_COURSE_COMPLETED_STATUS_START })
        //  ?x=2&y=3")
        return axios.get(`${GLOBAL.API_HOST}/totalCourseCompletedByAdmin`)
            .then(res => {
                console.log(res);
                //console.log(data)
                if (res.data.status === 200) {
                    // toast.success(res.data.message);
                    dispatch({ type: types.GET_COURSE_COMPLETED_STATUS_SUCCESS, payload: res.data.data })
                } else {
                    dispatch({ type: types.GET_COURSE_COMPLETED_STATUS_FAILURE, payload: res.data.message })
                    // toast.error(res.data.message);
                }
            })
            .catch(err => {
                dispatch({ type: types.GET_COURSE_COMPLETED_STATUS_FAILURE, payload: err })
            })
    }
}
