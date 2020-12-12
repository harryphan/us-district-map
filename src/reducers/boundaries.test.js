import reducer from './boundaries';
import {LOAD_COUNTIES, LOAD_STATES} from "../constants/action_constants";

describe('boundaries reducer test', () => {
    it('should return the initial state', () =>{
        const expected={counties: null,states:null}
        expect(reducer(undefined, {})).toEqual(expected);
    });
    it('should update state with payload', () =>{
        const expected={counties: null,states:[{test:'obj'}]};
        const action={type: LOAD_STATES,payload:[{test:'obj'}]};
        expect(reducer(undefined, action)).toEqual(expected);
    });
    it('should update counties with payload', () =>{
        const expected={counties: [{test:'obj'}],states:null};
        const action={type: LOAD_COUNTIES,payload:[{test:'obj'}]};
        expect(reducer(undefined, action)).toEqual(expected);
    });
    it('should do nothing', () =>{
        const expected={counties:null ,states:null};
        const action={type: 'fadjfla',payload:[{test:'obj'}]};
        expect(reducer(undefined, action)).toEqual(expected);
    });
});