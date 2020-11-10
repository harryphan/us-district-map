import {LOAD_STATES,LOAD_COVID,LOAD_COUNTIES,SET_ZOOM,SET_TOOLTIP,SET_CENTER,SET_FOCUSED_STATE_ID,ZOOM} from '../constants/action_constants';

export function loadStatesBoundaries(states){
  return {type: LOAD_STATES, payload:states}
}
export function loadCountiesBoundaries(counties){
  return {type: LOAD_COUNTIES, payload:counties}
}
export function loadCovid(data){
  return {type: LOAD_COVID, payload:data}
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
export function doZoom(payload){
  return {type: ZOOM, payload}
}
export function setTooltip(payload){
  return {type: SET_TOOLTIP, payload}
}
