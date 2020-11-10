import produce from 'immer';
import {LOAD_COVID} from '../constants/action_constants';
let initialState=[];

const covidData = (state=initialState, action) =>{
  return produce( state, draft =>{
    const {payload} = action;
    switch (action.type) {
      case LOAD_COVID:
        return payload;
      default:
        return;
    }
  })
}

export default covidData;
