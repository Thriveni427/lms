import * as types from '../../constants/actionTypes';
import { toast } from "react-toastify";
import axios from 'axios';
import * as GLOBAL from '../../utils/index';

// console.log(types.LOGIN_FAILURE)
export const actionStartTestByCourse = (data) => {
    return dispatch => {
         console.log(data);
        dispatch({ type: types.START_TEST_BY_COURSE_START });
        //  ?x=2&y=3")
        return axios.get(`${GLOBAL.API_HOST}/startTestByCourse?courseID=${data.courseID}`)
            .then(res => {
                console.log(res);
                console.log(data);
                if (res.data.status === 200) {
                    toast.success(res.data.message);
                    dispatch({ type: types.START_TEST_BY_COURSE_SUCCESS, payload: res.data.data });
                } else {
                    dispatch({ type: types.START_TEST_BY_COURSE_FAILURE, payload: res.data.message });
                    toast.error(res.data.message);
                }
            })
            .catch(err => {
                console.log(err);
                dispatch({ type: types.START_TEST_BY_COURSE_FAILURE, payload: err });
            })
    }
}
