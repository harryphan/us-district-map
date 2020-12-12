import reducer from "./mapParams";
import {
    SET_CENTER,
    SET_FOCUSED_STATE_ID,
    SET_TOOLTIP,
    SET_ZOOM
} from "../constants/action_constants";

describe('map params reducer test', () => {
    it('should return the initial state', () =>{
        const expected={
            center:[0,0],
            zoom:1,
            focusedStateId:0,
            tooltip:''
        };
        expect(reducer(undefined, {})).toEqual(expected);
    });
    it('should set center with payload', () =>{
        const expected={
            center:[42,37],
            zoom:1,
            focusedStateId:0,
            tooltip:''
        };
        const action={type: SET_CENTER,payload:[42,37]};
        expect(reducer(undefined, action)).toEqual(expected);
    });
    it('should set zoom level with payload', () =>{
        const expected={
            center:[0,0],
            zoom:2,
            focusedStateId:0,
            tooltip:''
        };
        const action={type: SET_ZOOM,payload:2};
        expect(reducer(undefined, action)).toEqual(expected);
    });
    it('should focused state id with payload', () =>{
        const expected={
            center:[0,0],
            zoom:1,
            focusedStateId:21,
            tooltip:''
        };
        const action={type: SET_FOCUSED_STATE_ID,payload:21};
        expect(reducer(undefined, action)).toEqual(expected);
    });
    it('should set tooltip with payload', () =>{
        const expected={
            center:[0,0],
            zoom:1,
            focusedStateId:0,
            tooltip:'test'
        };
        const action={type: SET_TOOLTIP,payload:'test'};
        expect(reducer(undefined, action)).toEqual(expected);
    });
    it('should do nothing', () =>{
        const expected={
            center:[0,0],
            zoom:1,
            focusedStateId:0,
            tooltip:''
        };
        const action={type: 'fadjfla',payload:[{test:'obj'}]};
        expect(reducer(undefined, action)).toEqual(expected);
    });
});