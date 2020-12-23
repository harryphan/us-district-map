import {
  SET_ZOOM,
  SET_TOOLTIP,
  SET_CENTER,
  SET_FOCUSED_STATE_ID,
  ZOOM,
  SET_MAPVIEW
} from '../constants/action_constants';

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

export function setMapView(mapView){
  return {type: SET_MAPVIEW, payload:mapView}
}