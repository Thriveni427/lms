import * as types from './../../../constants/actionTypes';
const initialState = {
  fetchingQuestions: false,
  fetchedQuestions: false,
  fetchingQuestionsError: null,
  questions: []
}
export const getQuestionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_QUESTIONS_START:
            return {
                ...state,
                fetchingQuestions: true,
                fetchedQuestions: false,
            };
        case types.GET_QUESTIONS_FAILURE:
            return {
                ...state,
                fetchingQuestions: false,
                fetchingQuestionsError: action.payload
            };
        case types.GET_QUESTIONS_SUCCESS:
            return {
                ...state,
                fetchingQuestions: false,
                fetchedQuestions: true,
                questions: action.payload
            };
        default:
            return state;
    }
}

// import * as types from './../../../constants/actionTypes';
// const initialState = {
//   fetchingQuestions: false,
//   fetchedQuestions: false,
//   fetchingQuestionsError: null,
//   Questions: []
// }
// export const getQuestionsReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case types.GET_QUESTIONS_START:
//       return {
//         ...state,
//         fetchingQuestions: true,
//         fetchedQuestions: false,
//       }
//     case types.GET_QUESTIONS_FAILURE:
//       return {
//         ...state,
//         fetchingQuestions: false,
//         fetchingQuestionsError: action.payload
//       }
//     case types.GET_QUESTIONS_SUCCESS:
//       return {
//         ...state,
//         fetchingQuestions: false,
//         fetchedQuestions: true,
//         Questions: action.payload
//       }
//     default:
//       return state
//   }
// }