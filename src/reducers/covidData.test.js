import reducer, {fetchCovidData} from './covidData';
import { LOAD_COVID, LOAD_US_COVID} from "../constants/action_constants";
import axios from 'axios';
import configureStore from "../configureStore";
jest.mock('axios');


describe('covid data reducer test', () => {
    it('should return the initial state', () =>{
        const expected={us:[], ma:[],isLoading:false}
        expect(reducer(undefined, {})).toEqual(expected);
    });
    it('should update us with payload', () =>{
        const expected={us:[{ny:2500}], ma:[],isLoading:false}
        const action={type: LOAD_US_COVID,payload:[{ny:2500}]};
        expect(reducer(undefined, action)).toEqual(expected);
    });
    it('should update ma with payload', () =>{
        const expected={us:[], ma:[{suffolk:20}],isLoading:false}
        const action={type: LOAD_COVID,payload:[{suffolk:20}]};
        expect(reducer(undefined, action)).toEqual(expected);
    });
    it('should do nothing', () =>{
        const expected={us:[], ma:[],isLoading:false};
        const action={type: 'fadjfla',payload:[{test:'obj'}]};
        expect(reducer(undefined, action)).toEqual(expected);
    });
    it('should fetch and load data', async () => {
        const store = configureStore();
        const mockCNNData={
            data: {
                "lastUpdated": "2020-12-29T07:45:13-05:00",
                "lastUpdatedStr": "December 29, 2020 at 7:45 a.m. ET",
                "data": [
                    {
                        "fips": "08025",
                        "state": "Colorado",
                        "name": "Crowley County",
                        "cases": 1635,
                        "deaths": 12,
                        "estimatedPopulation": 6061,
                        "deathsPer100Cases": 0.7,
                        "casesPer100KResidents": 26975.7,
                        "deathsPer100KResidents": 198,
                        "coordinates": {"lat": 38.3265917, "lng": -103.7848382}
                    }
                ]
            }
        };
        axios.get.mockResolvedValue(mockCNNData);
        await store.dispatch(fetchCovidData);
        const actual = store.getState().covidData;
        expect(actual.us[0]).toBe(mockCNNData.data.data[0]);
    });
});