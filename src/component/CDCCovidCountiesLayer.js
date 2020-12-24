import React, {Component} from 'react';
import {Geographies, Geography} from 'react-simple-maps';
import { scaleLinear,scaleLog,scaleRadial,scaleQuantile,scaleSequential } from 'd3-scale';

class CDCCovidCountiesLayer extends Component{
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return false;
    }
    render(){
        const {counties,usCovidData, setTooltip} = this.props;
        const property='percent_test_results_reported_positive_last_7_days';
        const sorted = [...usCovidData].sort((a,b) => a[property] - b[property]);
        const covidColorScale = scaleSequential().domain([0,100]).range(['white','red']);

        return (
            <Geographies geography={counties}>
                {({ geographies,projection,path }) =>{
                    const usMap=geographies.map(geo => {
                        const county =  usCovidData.find( c => c.fips_code === +geo.id );
                        const countyColor = county?covidColorScale(county[property]):'#FFF';
                        const countyTooltip = county?<div>{geo.properties.name + ' '+county[property] }</div>:<div/>;
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
        )
    }
}
export default CDCCovidCountiesLayer;
