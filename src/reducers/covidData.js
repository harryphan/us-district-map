import produce from 'immer';
import { LOAD_COVID, LOAD_US_COVID} from '../constants/action_constants';
import { csvParse } from 'd3-dsv';
import axios from 'axios';
import nationalCovid from '../data/all-covid.json';

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
  //const nationalCovid = await axios.get('https://covid.cdc.gov/covid-data-tracker/COVIDData/getAjaxData?id=integrated_county_latest_external_data');
  // const ma = csvParse(maCovid.data);
  // dispatch({ type: LOAD_COVID, payload: ma })
  // const usCovid = await axios.get('us-covid.csv');
  // const us = csvParse(usCovid.data);
  const CNNCovid = await axios.get('https://ix.cnn.io/data/novel-coronavirus-2019-ncov/us/counties.json');
  dispatch({ type: LOAD_US_COVID, payload: CNNCovid.data.data });
  //dispatch({ type: LOAD_US_COVID, payload: nationalCovid.integrated_county_latest_external_data });
  dispatch({type: 'SET_COVID_LOADING', payload:false});
}

export default covidData;
