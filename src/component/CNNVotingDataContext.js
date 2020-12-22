import React from 'react';
import * as d3 from 'd3';
import { scaleLinear } from 'd3-scale';

export default class CNNVotingDataContext {
    constructor(nationalVotingData) {
        this._nationalVotingData = nationalVotingData;
        let sorted=[...nationalVotingData].sort( (a,b) => a.totalVotes - b.totalVotes);
        this.voteOpScale = scaleLinear().domain([sorted[0].totalVotes,sorted[sorted.length-2].totalVotes]).range([0,1]);
        this._currentState={};
        this._bidenResult ={};
        this._trumpResult={}
        this._total={};
        this._voteRatio={};
    }
    selectCurrentStateById(id){
        this._currentState=this._nationalVotingData.find( s => s.id === id);
        this._bidenResult = this._currentState? this._currentState.candidates.find( c => c.id === 1036  ): {};
        this._trumpResult = this._currentState? this._currentState.candidates.find( c => c.id !== 1036  ): {};
        this._total =this._bidenResult.votes+this._trumpResult.votes
        this._voteRatio = this._bidenResult.id ? this._bidenResult.votes/this._total :0;
        if (this._currentState && this._currentState.counties) {
            let sortedCounties = [...this._currentState.counties].sort((a, b) => a.totalVotes - b.totalVotes);
            this.voteCountyOpScale = scaleLinear().domain([sortedCounties[0].totalVotes, sortedCounties[sortedCounties.length - 1].totalVotes]).range([0, 1]);
        }
        return this._currentState;
    }
    selectCurrentCountyById(id){
        this._currentCounty=this._currentState.counties.find( county => county.id === id);
        this._bidenCountyResult = this._currentCounty ?this._currentCounty.candidates.find( c => c.id === 1036  ): {}
        this._trumpCountyResult = this._currentCounty? this._currentCounty.candidates.find( c => c.id !== 1036  ): {};
        this._countyTotal =this._bidenCountyResult.votes+this._trumpCountyResult.votes
        this._countyVoteRatio = this._bidenCountyResult.id ? this._bidenCountyResult.votes/this._countyTotal :0;
        return this._currentCounty;
    }
    getTooltip(name){
        return this._currentState?(<div>
            <div>{name}</div>
            <div>Total votes: {this._currentState.totalVotes}</div>
            <div>Biden: {this._bidenResult.votes}</div>
            <div>Trump: {this._trumpResult.votes}</div>
        </div>):null;
    }
    getCountyTooltip(name){
        return this._currentCounty?(
            <>
                <div>County: {name}</div>
                <div>Total Votes: {this._currentCounty.totalVotes}</div>
                <div>Joe Biden: {this._bidenCountyResult.votes}</div>
                <div>Donald Trump: {this._trumpCountyResult.votes}</div>
            </>
        ):null;
    }
    getCountyColor(){
        const countyColor= this._currentCounty ? d3.color(this._countyVoteRatio>=.5? '#00F':'#F00').copy({opacity:this.voteCountyOpScale(this._countyTotal)}):"#DDD";
        return countyColor;
    }
    getStateColor(id,focusedStateId){
        const stateColor=this._currentState && focusedStateId !==id ? d3.color(this._voteRatio>=.5? '#00F':'#F00').copy({opacity:this.voteOpScale(this._total)}) :"#DDD";
        return stateColor;
    }
}