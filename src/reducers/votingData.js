import produce from 'immer';
import axios from 'axios';
import xml2js from 'xml2js';

let initialState={
    us:[],
    ga:{},
    isLoading:false
};

const votingData = (state=initialState, action) =>{
    return produce( state, draft =>{
        const {payload} = action;
        switch (action.type) {
            case 'SET_GA_DATA':
                draft.ga=payload;
                break;
            case 'SET_VOTING_LOADING':
                draft.isLoading=payload;
                break;
            default:
                return;
        }
    })
}
export async function fetchVotingData(dispatch, getState) {
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