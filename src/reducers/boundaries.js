import produce from 'immer';
import {LOAD_STATES,LOAD_COUNTIES} from '../constants/action_constants';
import axios from "axios";
let initialState={
  states:null,
  counties:null,
  isLoading:false
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
      case 'SET_BOUNDARIES_LOADING':
        draft.isLoading=payload;
        break;
      default:
        return;
    }
  })
}
export async function fetchBoundaries(dispatch, getState) {
  dispatch({ type: 'SET_BOUNDARIES_LOADING', payload: true })
  const states = await axios.get('states-10m.json')
  dispatch({ type: LOAD_STATES, payload: states.data })
  const counties = await axios.get('counties-10m.json')
  dispatch({ type: LOAD_COUNTIES, payload: counties.data })
  dispatch({ type: 'SET_BOUNDARIES_LOADING', payload: false })
}

export default boundaries;
