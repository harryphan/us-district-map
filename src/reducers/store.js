import boundaries from './boundaries';
import mapParams from './mapParams';
import covidData from './covidData';
import {combineReducers} from 'redux';
import votingData from './votingData';

const rootReducer = combineReducers({
  boundaries,
  mapParams,
  covidData,
  votingData,
})
export default rootReducer;
