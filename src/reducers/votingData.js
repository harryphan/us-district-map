import produce from 'immer';
import axios from 'axios';
import xml2js from 'xml2js';
import {createAsyncThunk} from '@reduxjs/toolkit';

let initialState={
    us:[],
    isLoadingCounties:false,
    isLoading:false,
};

const votingData = (state=initialState, action) =>{
    return produce( state, draft =>{
        const {payload} = action;
        switch (action.type) {
            case 'SET_GA_DATA':
                draft.ga=payload;
                break;
            case 'SET_STATE_LEVEL_RESULTS':
                let index = draft.us.findIndex( s => s.state === payload.state);
                if (index >= 0){
                    draft.us[index] = payload;
                }else{
                    draft.us.push(payload);
                }
                break;
            case 'SET_COUNTY_VOTING_DATA':
                let holder = draft.us.find( s => s.state === payload.stateAbbr);
                if(holder){
                    holder.counties = payload.counties;
                }
                break;
            case 'SET_VOTING_LOADING':
                draft.isLoading=payload;
                break;
            case 'SET_COUNTIES_VOTING_LOADING':
                draft.isLoadingCounties=payload;
                break;
            default:
                return;
        }
    })
}
export async function fetchNationalVotingData(dispatch,getState){
    dispatch({type: 'SET_VOTING_LOADING', payload:true});
    const nationalResults = await axios.get('https://politics-elex-results.data.api.cnn.io/results/view/2020-national-races-PG.json');
    nationalResults.data.forEach( stateResult =>{
        const result = { id: stateResult.stateFipsCode,state:stateResult.stateAbbreviation,totalVotes:stateResult.totalVote,candidates:stateResult.candidates.map( candidate => {return {id: candidate.candidateId,name: candidate.fullName, votes: candidate.voteNum}})}
        dispatch({type: 'SET_STATE_LEVEL_RESULTS',payload: result});
    });
    dispatch({type: 'SET_VOTING_LOADING', payload:false});
}

export function fetchStateVotingData(stateAbbr){
    return async function fetchStateVotingDataThunk(dispatch, getState) {
        dispatch({type: 'SET_COUNTIES_VOTING_LOADING', payload:true});
        const url = `https://politics-elex-results.data.api.cnn.io/results/view/2020-county-races-PG-${stateAbbr}.json`
        const counties = await axios.get(url);
        const results= counties.data.map(county => {
            const totalVotes=county.candidates.reduce((acc,current) => current.voteNum + acc,0);
            return {name:county.countyName,id:county.countyFipsCode,totalVotes:totalVotes,candidates:county.candidates.map( candidate => {return {id: candidate.candidateId,name: candidate.fullName, votes: candidate.voteNum}})}
        })
        dispatch({type: 'SET_COUNTY_VOTING_DATA',payload:{stateAbbr,counties:results}});
        dispatch({type: 'SET_COUNTIES_VOTING_LOADING', payload:false});
    }
}

export async function fetchGAVotingData(dispatch, getState) {
    dispatch({type: 'SET_VOTING_LOADING', payload:true});
    const gaVoting = await axios.get('ga-detail.xml');
    let parser = new xml2js.Parser()
    let result = await parser.parseStringPromise(gaVoting.data);
    const votes = result.ElectionResult.Contest.find((contest)=> contest.$.key==='5000').Choice;
    const trump = votes.find( c => c.$.key === '1');
    const biden = votes.find( c => c.$.key === '2');
    const jorgensen = votes.find( c => c.$.key === '3');
    const reducer = (accumulator, currentValue, candidate) => {
        currentValue.County.forEach(county => {
            const name = county.$.name;
            let match = accumulator.find( c => c.name === name);
            if(match === undefined){
                let tmp={name};
                tmp[candidate] = +county.$.votes;
                accumulator.push(tmp);
            }else{
                if (match[candidate]) {
                    match[candidate] += +county.$.votes;
                }else{
                    match[candidate] = +county.$.votes;
                }
            }
        })
        return accumulator;
    };
    let counties = trump.VoteType.reduce(
        (accumulator, currentValue) => reducer(accumulator,currentValue,'trump')
        ,[]
        );
    counties = biden.VoteType.reduce(
        (accumulator, currentValue) => reducer(accumulator,currentValue,'biden')
        ,counties
    );
    counties = jorgensen.VoteType.reduce(
        (accumulator, currentValue) =>  reducer(accumulator,currentValue,'jorgensen')
        ,counties
    );
    let res={
        total: +trump.$.totalVotes + +biden.$.totalVotes + +jorgensen.$.totalVotes,
        trumpTotal: +trump.$.totalVotes,
        bidenTotal: +biden.$.totalVotes,
        jorgensenTotal: +jorgensen.$.totalVotes,
        counties
    }
    dispatch({type: 'SET_GA_DATA',payload:res});
    dispatch({type: 'SET_VOTING_LOADING', payload:false});
}

export default votingData;