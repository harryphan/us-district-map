import produce from 'immer';
import {LOAD_STATES,LOAD_COUNTIES} from '../constants/action_constants';
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

export default boundaries;
