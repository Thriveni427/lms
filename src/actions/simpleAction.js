import { actionTypes as types } from '../constants'

export const simpleAction = () => dispatch => {
  dispatch({
   type: 'SIMPLE_ACTION',
   payload: 'result_of_simple_action'
  })
 }