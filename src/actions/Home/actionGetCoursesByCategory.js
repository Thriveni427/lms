import * as types from '../../constants/actionTypes';
import { toast } from "react-toastify";
import axios from 'axios';
import * as GLOBAL from '../../utils/index';

export const actionGetCoursesByCategory = (data) => {
    return dispatch => {
        dispatch({ type: types.GET_COURSES_BY_CATEGORY_START })
        return axios.get(`${GLOBAL.API_HOST}/getCoursesByCategory?categoryID=${data}`)
            .then(res => {
                console.log(res);
                if (res.data.status === 200) {
                    toast.success(res.data.message);
                    dispatch({ type: types.GET_COURSES_BY_CATEGORY_SUCCESS, payload: res.data.data })
                } else {
                    dispatch({ type: types.GET_COURSES_BY_CATEGORY_FAILURE, payload: res.data.message })
                    toast.error(res.data.message);
                }
            })
            .catch(err => {
                dispatch({ type: types.GET_COURSES_BY_CATEGORY_FAILURE, payload: err })
            })
    }
}

