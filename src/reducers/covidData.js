import produce from 'immer';
import { LOAD_COVID, LOAD_US_COVID} from '../constants/action_constants';
import { csvParse } from 'd3-dsv';
import axios from 'axios';

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
export async function fetchCovidData(dispatch, getState) {
  const result = await axios.get('covid.csv')
  const res = csvParse(result.data);
  dispatch({ type: LOAD_COVID, payload: res })
}
export async function fetchUSCovidData(dispatch, getState) {
  const result = await axios.get('united_states_covid19_cases_and_deaths_by_state.csv');
  const res = csvParse(result.data);
  dispatch({ type: LOAD_US_COVID, payload: res })
}

export default covidData;
