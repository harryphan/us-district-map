import produce from 'immer';
import {SET_CENTER,SET_ZOOM,SET_FOCUSED_STATE_ID,ZOOM} from '../constants/action_constants';
let initialState={
  center:[0,0],
  zoom:1,
  focusedStateId:0,
};

const mapParams = (state=initialState, action) =>{
  return produce( state, draft =>{
    const {payload} = action;
    switch (action.type) {
      case SET_CENTER:
        draft.center=payload;
        break;
      case SET_ZOOM:
        draft.zoom=payload;
        break;
      case SET_FOCUSED_STATE_ID:
        draft.focusedStateId = payload;
        break;
      case ZOOM:
        return {...payload};
      default:
        return;
    }
  })
}

export default mapParams;
