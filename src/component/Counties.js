import React, {Component, memo} from 'react';
import {Geographies, Geography} from "react-simple-maps";
import {scaleLinear, scaleThreshold, scaleLog} from 'd3-scale';
import * as d3 from 'd3';
import counties from '../data/counties-10m.json';

const Counties = ({stateVotingData, gaVotingData, focusedStateId, setTooltip}) => {
    const countyVotingData = stateVotingData.counties
    let sorted = [...countyVotingData].sort((a, b) => a.totalVotes - b.totalVotes);
    const voteOpScale = scaleLinear().domain([sorted[0].totalVotes, sorted[sorted.length - 1].totalVotes]).range([0, 1]);
    return (
        <Geographies geography={counties}>
            {({geographies, projection, path}) => {

                const focused = geographies.filter(geo => {
                    return geo.id.substring(0, 2) === focusedStateId
                });
                return (
                    <>
                        {focused.map(geo => {
                            const {name} = geo.properties;
                            const countyData = stateVotingData.counties ? stateVotingData.counties.find(county => county.id === geo.id) : undefined;
                            const bidenResult = countyData ? countyData.candidates.find(c => c.id === 1036) : {};
                            const trumpResult = countyData ? countyData.candidates.find(c => c.id !== 1036) : {};
                            const total = bidenResult.votes + trumpResult.votes
                            const voteRatio = bidenResult.id ? bidenResult.votes / total : 0;
                            return (
                                <Geography
                                    key={geo.rsmKey}
                                    stroke="#000"
                                    geography={geo}
                                    fill={countyData ? d3.color(voteRatio >= .5 ? '#00F' : '#F00').copy({opacity: voteOpScale(total)}) : "#DDD"}
                                    onMouseEnter={() => {
                                        setTooltip(<>
                                            <div>County: {name}</div>
                                            <div>Total Votes: {bidenResult.votes + trumpResult.votes}</div>
                                            <div>Joe Biden: {bidenResult.votes}</div>
                                            <div>Donald Trump: {trumpResult.votes}</div>
                                        </>);
                                    }}
                                    onMouseLeave={() => {
                                        setTooltip('');
                                    }}
                                    style={{
                                        default: {
                                            stroke: "#FFFFFF",
                                            strokeWidth: 0.1,
                                            outline: "none",
                                        },
                                        hover: {
                                            fill: "#CFD8DC",
                                            stroke: "#607D8B",
                                            strokeWidth: 0.2,
                                            outline: "none",
                                        },
                                    }}
                                />
                            )
                        })
                        }
                    </>
                )
            }}
        </Geographies>
    );
}
export default memo(Counties);
