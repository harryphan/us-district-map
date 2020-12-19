import reducer from './boundaries';
import {LOAD_COUNTIES, LOAD_STATES} from "../constants/action_constants";

describe('boundaries reducer test', () => {
    it('should return the initial state', () =>{
        const expected={counties: null,states:null,isLoading:false}
        expect(reducer(undefined, {})).toEqual(expected);
    });
    it('should update state with payload', () =>{
        const expected={counties: null,states:[{test:'obj'}],isLoading:false};
        const action={type: LOAD_STATES,payload:[{test:'obj'}]};
        expect(reducer(undefined, action)).toEqual(expected);
    });
    it('should update counties with payload', () =>{
        const expected={counties: [{test:'obj'}],states:null,isLoading:false};
        const action={type: LOAD_COUNTIES,payload:[{test:'obj'}]};
        expect(reducer(undefined, action)).toEqual(expected);
    });
    it('should do nothing', () =>{
        const expected={counties:null ,states:null,isLoading:false};
        const action={type: 'fadjfla',payload:[{test:'obj'}]};
        expect(reducer(undefined, action)).toEqual(expected);
    });
});