import React,{memo} from 'react';
import { Geographies, Geography } from "react-simple-maps";
import { scaleLinear,scaleThreshold,scaleLog } from 'd3-scale';
import * as d3 from 'd3';

const Counties = ({counties,covidData,gaVotingData,focusedStateId,setTooltip}) =>{
  const filtered = covidData.filter(covid => covid.date === '11/9/2020').sort((a,b) => a.new_confirmed_cases - b.new_confirmed_cases);
  const colorScale = scaleLinear().domain([0,filtered[filtered.length-1].new_confirmed_cases]).range(['white','red']);
  const totals = gaVotingData.counties.map(county => county.trump + county.biden + county.jorgensen);
  const voteOpScale = scaleLog().domain([Math.min(...totals),Math.max(...totals)]).range([0,1]);
  const voteColorScale = scaleThreshold().domain([.5,.5]).range(['red','blue']);
  return (
            <Geographies geography={counties}>
              {({ geographies,projection,path }) => {
                const focused = geographies.filter( geo => { return +geo.id.substring(0,2) === focusedStateId});

                return(
                <>
                  {focused.map(geo => {
                      const { name } = geo.properties;
                      const data = focusedStateId === 25 ? filtered.find( c => c.county === name):undefined;
                      let voterData = focusedStateId === 13 ? gaVotingData.counties.find( county => county.name === name):undefined;
                      let total = 0;
                      if(voterData){
                        total=voterData.trump+voterData.biden+voterData.jorgensen;
                      }
                      return (
                        <Geography
                          key={geo.rsmKey}
                          stroke="#000"
                          geography={geo}
                          fill={data ? colorScale(data.new_confirmed_cases) : voterData? d3.color(voteColorScale(voterData.biden/total)).copy({opacity:voteOpScale(total)}) :"#DDD"}
                          onMouseEnter={() => {

                            if(focusedStateId === 25){
                              const entry = filtered.find( c => c.county === name);
                              const {county, new_confirmed_cases, total_confirmed_cases} = entry;
                              setTooltip(<><div>County: {county}</div><div>New Cases: {new_confirmed_cases}</div><div>Total Cases: {total_confirmed_cases}</div></>);
                            }else if(focusedStateId === 13){
                                let {trump,biden,jorgensen} = voterData;
                                setTooltip(<><div>County: {name}</div><div>Total Votes: {biden+trump+jorgensen}</div><div>Joe Biden: {biden}</div><div>Donald Trump: {trump}</div><div>Jo Jorgensen: {jorgensen}</div></>);
                            }
                            else{
                              setTooltip(name);
                            }
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
              )}}
            </Geographies>
  );
}
export default memo(Counties);
