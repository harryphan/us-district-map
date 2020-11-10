import boundaries from './boundaries';
import mapParams from './mapParams';
import covidData from './covidData';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  boundaries,
  mapParams,
  covidData,
})
export default rootReducer;
