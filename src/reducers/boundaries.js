import produce from 'immer';
import {LOAD_STATES,LOAD_COUNTIES} from '../constants/action_constants';
import axios from "axios";
let initialState={
  states:null,
  counties:null,
};

const boundaries = (state=initialState, action) =>{
  return produce( state, draft =>{
    const {payload} = action;
    switch (action.type) {
      case LOAD_STATES:
        draft.states=payload;
        break;
      case LOAD_COUNTIES:
        draft.counties=payload;
        break;
      default:
        return;
    }
  })
}
export async function fetchStates(dispatch, getState) {
  const response = await axios.get('states-10m.json')
  dispatch({ type: LOAD_STATES, payload: response.data })
}
export async function fetchCounties(dispatch, getState) {
  const response = await axios.get('counties-10m.json')
  dispatch({ type: LOAD_COUNTIES, payload: response.data })
}
export default boundaries;
