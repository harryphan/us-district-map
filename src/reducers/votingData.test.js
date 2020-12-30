import reducer from './votingData';
import {
    INIT_VOTING_DATA_CONTEXT,
    SET_COUNTIES_VOTING_LOADING,
    SET_COUNTY_VOTING_DATA,
    SET_STATE_LEVEL_RESULTS,
    SET_VOTING_LOADING
} from "../constants/action_constants";

describe('voting data reducer test', () => {
    it('should return the initial state', () =>{
        const expected={
            us:[],
            dataContext:null,
            isLoadingCounties:false,
            isLoading:false,
        };
        expect(reducer(undefined, {})).toEqual(expected);
    });
    it('should set county voting loading state', () =>{
        const expected={
            us:[],
            dataContext:null,
            isLoadingCounties:true,
            isLoading:false,
        };
        const action={type: SET_COUNTIES_VOTING_LOADING,payload: true};
        expect(reducer(undefined, action)).toEqual(expected);
    });
    it('should set voting data context', () =>{
        const expected={
            us:[],
            dataContext: {},
            isLoadingCounties:false,
            isLoading:false,
        };
        const action={type: INIT_VOTING_DATA_CONTEXT,payload: {}};

        expect(reducer(undefined, action)).toEqual(expected);
    });
    it('should set county voting data', () =>{
        const expected={
            us:[{ id: 123,state: 'MA',totalVotes:55,counties:[{id:123},{id:333}],candidates:[ {id: 1,name: 'candidate', votes: 33}] }],
            dataContext:null,
            isLoadingCounties:false,
            isLoading:false,
        };
        const action={type: SET_COUNTY_VOTING_DATA,payload:{stateAbbr: 'MA',counties: [{id:123},{id:333}]}};
        const initial={
            us:[{ id: 123,state: 'MA',totalVotes:55,candidates:[ {id: 1,name: 'candidate', votes: 33}] }],
            dataContext:null,
            isLoadingCounties:false,
            isLoading:false,
        };

        expect(reducer(initial, action)).toEqual(expected);
    });
    it('should set state level results', () =>{
        const expected={
            us:[{ id: 123,state: 'MA',totalVotes:55,candidates:[ {id: 1,name: 'candidate', votes: 33}] }],
            dataContext:null,
            isLoadingCounties:false,
            isLoading:false,
        };
        const action={type: SET_STATE_LEVEL_RESULTS,payload: { id: 123,state: 'MA',totalVotes:55,candidates:[ {id: 1,name: 'candidate', votes: 33}] }};
        expect(reducer(undefined, action)).toEqual(expected);
    });
    it('should set state lvl loading state', () =>{
        const expected={
            us:[],
            dataContext:null,
            isLoadingCounties:false,
            isLoading: true,
        };
        const action={type: SET_VOTING_LOADING,payload: true};
        expect(reducer(undefined, action)).toEqual(expected);
    });

    it('should do nothing', () =>{
        const expected={
            us:[],
            dataContext:null,
            isLoadingCounties:false,
            isLoading:false,
        };
        const action={type: 'fadjfla',payload:[{test:'obj'}]};
        expect(reducer(undefined, action)).toEqual(expected);
    });
});