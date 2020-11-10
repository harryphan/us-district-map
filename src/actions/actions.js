import {LOAD_STATES,LOAD_COUNTIES,SET_ZOOM,SET_CENTER,SET_FOCUSED_STATE_ID} from '../constants/action_constants';

export function loadStatesBoundaries(states){
  return {type: LOAD_STATES, payload:states}
}
export function loadCountiesBoundaries(counties){
  return {type: LOAD_COUNTIES, payload:counties}
}
export function setZoom(zoom){
  return {type: SET_ZOOM, payload:zoom}
}
export function setCenter(center){
  return {type: SET_CENTER, payload:center}
}
export function setFocusedState(id){
  return {type: SET_FOCUSED_STATE_ID, payload:id}
}
