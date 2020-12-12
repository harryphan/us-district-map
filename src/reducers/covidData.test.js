import reducer from './covidData';
import { LOAD_COVID, LOAD_US_COVID} from "../constants/action_constants";

describe('covid data reducer test', () => {
    it('should return the initial state', () =>{
        const expected={us:[], ma:[]}
        expect(reducer(undefined, {})).toEqual(expected);
    });
    it('should update us with payload', () =>{
        const expected={us:[{ny:2500}], ma:[]}
        const action={type: LOAD_US_COVID,payload:[{ny:2500}]};
        expect(reducer(undefined, action)).toEqual(expected);
    });
    it('should update ma with payload', () =>{
        const expected={us:[], ma:[{suffolk:20}]}
        const action={type: LOAD_COVID,payload:[{suffolk:20}]};
        expect(reducer(undefined, action)).toEqual(expected);
    });
    it('should do nothing', () =>{
        const expected={us:[], ma:[]};
        const action={type: 'fadjfla',payload:[{test:'obj'}]};
        expect(reducer(undefined, action)).toEqual(expected);
    });
});