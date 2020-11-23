import produce from 'immer';
import {LOAD_COVID,LOAD_US_COVID} from '../constants/action_constants';
let initialState={
  us:[],
  ma:[]
};

const covidData = (state=initialState, action) =>{
  return produce( state, draft =>{
    const {payload} = action;
    switch (action.type) {
      case LOAD_COVID:
        draft.ma=payload;
        break;
      case LOAD_US_COVID:
        draft.us=payload;
        break;
      default:
        return;
    }
  })
}

export default covidData;
