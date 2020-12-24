import React, {Component} from 'react';
import {Geographies, Geography} from 'react-simple-maps';
import { scaleLinear,scaleLog,scaleRadial,scaleQuantile,scaleSequential } from 'd3-scale';
import * as d3 from 'd3';

class CNNCovidCountiesLayer extends Component{
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return true;
    }
    render(){
        const {geographies, usCovidData, setTooltip} = this.props;
        const property='casesPer100KResidents';
        const sorted = [...usCovidData].sort((a,b) => a[property] - b[property]);
        const covidColorScale = scaleLog().domain([2500,20000]).range([0,1]);
        return (
                geographies.map(geo => {
                    const county =  usCovidData.find( c => c.fips === geo.id );
                    const countyColor = county?d3.color('#F00').copy({opacity:covidColorScale(county[property])}):'#FFF';
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
                })
        )
    }
}
export default CNNCovidCountiesLayer;
