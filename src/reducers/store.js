import boundaries from './boundaries';
import mapParams from './mapParams';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  boundaries,
  mapParams,
})
export default rootReducer;
