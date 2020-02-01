import * as types from './../constants/actionTypes';
const initialState = {
	gettingCourseTopicList: false,
	gotCourseTopicList: false,
	gettingCourseTopicListError: null,
	gotCourseTopicListData: []
}
export const getCourseTopicListReducer = (state = initialState, action) => {
	//console.log(action);
	switch (action.type) {
		case types.GET_COURSE_TOPIC_LIST_START:
			return {
				...state,
				gettingCourseTopicList: true
			};
		case types.GET_COURSE_TOPIC_LIST_FAILURE:
			return {
				...state,
				gettingCourseTopicList: false,
				gettingCourseTopicListError: action.payload
			};
		case types.GET_COURSE_TOPIC_LIST_SUCCESS:
			console.log("Inside getCategoryListReducer : Success");
			console.log(action.payload);
			return {
				...state,
				gettingCourseTopicList: false,
				gotCourseTopicList: true,
				gotCourseTopicListData: action.payload
			};
		default:
			return state;
	}
}
