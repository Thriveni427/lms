import * as types from './../constants/actionTypes';
const initialState = {
  editingQuestionBank: false,
  editedQuestionBank: false,
  editingQuestionBankError: null,
  editQuestionBankData: []
}
export const editQuestionBankReducer = (state = initialState , action) => {
  console.log(action);
  switch(action.type) {
    case types.EDIT_QUESTION_BANK_START:
      return {
        ...state, editingQuestionBank: true, editedQuestionBank: false
      };
    case types.EDIT_QUESTION_BANK_FAILURE:
      return {
        ...state, editingQuestionBank: false, editingQuestionBankError: action.payload
      };
    case types.EDIT_QUESTION_BANK_SUCCESS:
      return {
        ...state,
        editingQuestionBank: false,
        editedQuestionBank: true,
        editQuestionBankData: action.payload
      };
    default:
      return state;
  }
}