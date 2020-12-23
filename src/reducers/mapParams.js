import produce from 'immer';
import {SET_CENTER,SET_ZOOM,SET_TOOLTIP,SET_FOCUSED_STATE_ID,ZOOM} from '../constants/action_constants';
const initialState={
  center:[0,0],
  zoom:1,
  focusedStateId:0,
  // center:[-83.43523233606125, 32.63933616159129],
  // zoom:4,
  // focusedStateId:13,
  tooltip:'',
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
      case SET_TOOLTIP:
        draft.tooltip = payload;
        break;
      case ZOOM:
        return {...payload};
      default:
        return;
    }
  })
}

export default mapParams;
