import React, {memo} from 'react';
import { Geographies, Geography} from 'react-simple-maps';
import statesBoundaries from '../data/states-10m.json';
import allStates from '../data/allstates.json';
import * as d3 from 'd3';
import { scaleLinear } from 'd3-scale';
import CNNVotingDataContext from "./CNNVotingDataContext";

const VotingLayer = ({votingDataContext,focusedStateId, handleStateClick,zoom,setTooltip}) => {


    return (
        <Geographies geography={statesBoundaries}>
            {
                ({ geographies,projection,path }) =>{
                    const usMap=geographies.map(geo => {
                        const stateAbbr = allStates.find(s => s.val === geo.id).id;
                        votingDataContext.selectCurrentStateById(geo.id);
                        const stateColor = votingDataContext.getStateColor(focusedStateId);
                        const tooltip= votingDataContext.getTooltip(geo.properties.name);
                        return (
                            <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                fill={stateColor}
                                onMouseEnter={() => {
                                    setTooltip(tooltip);
                                }}
                                onMouseLeave={() => {
                                    setTooltip('');
                                }}
                                onClick={() => handleStateClick(geo, projection, path,stateAbbr,zoom)}
                                style={{
                                    default: {
                                        stroke: "#000",
                                        strokeWidth: 0.5 / zoom,
                                        strokeOpacity: 0,
                                        outline: "none",
                                    },
                                    hover: {
                                        fill: "#CFD8DC",
                                        stroke: "#607D8B",
                                        strokeWidth: 1 / zoom,
                                        outline: "none",
                                    },
                                }}
                            />)
                    });

                    return usMap;
                }
            }
        </Geographies>
    );
}
export default memo(VotingLayer);
