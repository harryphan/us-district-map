import React from 'react';
import statesBoundaries from '../data/states-10m.json';
import {Geographies, Geography} from 'react-simple-maps';


const BasicMapLayer = ({setTooltip,handleStateClick}) =>
            <Geographies geography={statesBoundaries}>
                {({ geographies,projection,path }) =>
                    geographies.map(geo => {
                        return (
                            <Geography
                                key={geo.rsmKey}
                                stroke="#000"
                                geography={geo}
                                fill={"#FFF"}
                                onMouseEnter={() => {
                                    setTooltip(<div>{geo.properties.name}</div>);
                                }}
                                onMouseLeave={() => {
                                    setTooltip('');
                                }}
                                onClick={() => handleStateClick(geo,projection,path)}
                                style={{
                                    default: {
                                        stroke: "#000",
                                        strokeWidth: 0.2,
                                        outline: "none",
                                    },
                                    hover: {
                                        fill: "#CFD8DC",
                                        stroke: "#607D8B",
                                        strokeWidth: 1,
                                        outline: "none",
                                    },
                                }}
                            />)
                    })
                }
            </Geographies>
        ;
export default BasicMapLayer;
