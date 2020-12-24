import React, {Component, memo} from 'react';
import {Geographies, Geography} from 'react-simple-maps';
import { scaleLinear,scaleLog,scaleRadial,scaleQuantile,scaleSequential } from 'd3-scale';
import * as d3 from 'd3';
class CNNCovidCountiesLayer extends Component{
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return false;
    }
    render(){
        const {counties,usCovidData, setTooltip} = this.props;
        const property='casesPer100KResidents';
        const sorted = [...usCovidData].sort((a,b) => a[property] - b[property]);
        const covidColorScale = scaleSequential(d3.interpolateYlOrRd).domain([sorted[0][property],sorted[sorted.length-1][property]]);

        return (
            <Geographies geography={counties}>
                {({ geographies,projection,path }) =>{
                    const usMap=geographies.map(geo => {
                        const county =  usCovidData.find( c => c.fips === geo.id );
                        const countyColor = county?covidColorScale(county[property]):'#FFF';
                        const countyTooltip = county?<div>
                            <div>{geo.properties.name}</div>
                            <div>Cases: {county.cases}</div>
                            <div>Deaths: {county.deaths}</div>
                            <div>Est. Pop: {county.estimatedPopulation}</div>
                            <div>Deaths/100 cases: {county.deathsPer100Cases}</div>
                            <div>Cases/100K pp: {county.casesPer100KResidents}</div>
                            <div>Deaths/100K pp: {county.deathsPer100KResidents}</div>
                        </div>:<div/>;
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
                                        strokeWidth: 0.1,
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
        )
    }
}
export default CNNCovidCountiesLayer;
