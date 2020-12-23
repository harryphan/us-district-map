import produce from 'immer';
import mapview_constants from '../constants/mapview_constants';
import {SET_MAPVIEW} from '../constants/action_constants';

const initialState={
    mapView:mapview_constants.ELECTION_RESULTS_COUNTY,
};

const dashboard = (state=initialState, action) =>{
    return produce( state, draft =>{
        const {payload} = action;
        switch (action.type) {
            case SET_MAPVIEW:
                draft.mapView=payload;
                break;
            default:
                return;
        }
    })
}

export default dashboard;