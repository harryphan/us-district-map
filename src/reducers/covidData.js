import produce from 'immer';
import { LOAD_COVID, LOAD_US_COVID} from '../constants/action_constants';
import { csvParse } from 'd3-dsv';
import axios from 'axios';

let initialState={
  us:[],
  ma:[],
  isLoading:false
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
      case 'SET_COVID_LOADING':
        draft.isLoading=payload;
        break;
      default:
        return;
    }
  })
}
export async function fetchCovidData(dispatch, getState) {
  dispatch({type: 'SET_COVID_LOADING', payload:true});
  const maCovid = await axios.get('covid.csv')
  const ma = csvParse(maCovid.data);
  dispatch({ type: LOAD_COVID, payload: ma })
  const usCovid = await axios.get('us-covid.csv');
  const us = csvParse(usCovid.data);
  dispatch({ type: LOAD_US_COVID, payload: us });
  dispatch({type: 'SET_COVID_LOADING', payload:false});
}
export async function fetchUSCovidData(dispatch, getState) {

}

export default covidData;
