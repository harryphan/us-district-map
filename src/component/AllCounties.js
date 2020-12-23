import {Geographies, Geography} from 'react-simple-maps';
import React, {memo} from 'react';
import counties from '../data/counties-10m.json'

const AllCounties = ({setTooltip,votingDataContext}) =>{
    return(
        <Geographies geography={counties}>
            {({ geographies,projection,path }) =>{
                const usMap=geographies.map(geo => {
                    const stateId=geo.id.substr(0,2);
                    let stat = votingDataContext.selectCurrentStateById(stateId);
                    let county = stat ? votingDataContext.selectCurrentCountyById(geo.id):undefined;
                    const countyColor = county ? votingDataContext.getCountyColor(geo.id):'#FFF';
                    const countyTooltip = county ? votingDataContext.getCountyTooltip(geo.properties.name):<div>{geo.properties.name + ' '+geo.id }</div>;
                    return (
                        <Geography
                            key={geo.rsmKey}
                            stroke="#000"
                            geography={geo}
                            fill={countyColor}
                            onMouseEnter={() => {
                                setTooltip(countyTooltip);
                            }}
                            onMouseLeave={() => {
                                setTooltip('');
                            }}
                            style={{
                                default: {
                                    stroke: "#000",
                                    strokeWidth: 0.01,
                                    outline: "none",
                                },
                                hover: {
                                    fill: "#CFD8DC",
                                    stroke: "#607D8B",
                                    strokeWidth: .25,
                                    outline: "none",
                                },
                            }}
                        />)
                });
                return <>
                    {usMap}
                </>
            }
            }
        </Geographies>
    );
}

export default memo(AllCounties);