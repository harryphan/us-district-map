import boundaries from './boundaries';
import mapParams from './mapParams';
import covidData from './covidData';
import {combineReducers} from 'redux';
import votingData from './votingData';
import dashboard from "./dashboard";

const rootReducer = combineReducers({
  boundaries,
  mapParams,
  covidData,
  votingData,
  dashboard,
})
export default rootReducer;
