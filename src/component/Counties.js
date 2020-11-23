import React,{memo} from 'react';
import { Geographies, Geography } from "react-simple-maps";
import { scaleLinear } from 'd3-scale';

const Counties = ({counties,covidData,focusedStateId,setTooltip}) =>{
  const filtered = covidData.filter(covid => covid.date === '11/9/2020').sort((a,b) => a.new_confirmed_cases - b.new_confirmed_cases);
  const colorScale = scaleLinear().domain([0,filtered[filtered.length-1].new_confirmed_cases]).range(['white','red']);
  return (
            <Geographies geography={counties}>
              {({ geographies,projection,path }) => {
                const focused = geographies.filter( geo => { return +geo.id.substring(0,2) === focusedStateId});

                return(
                <>
                  {focused.map(geo => {
                      const { name } = geo.properties;
                      const data = focusedStateId === 25 ? filtered.find( c => c.county === name):undefined;
                      return (
                        <Geography
                          key={geo.rsmKey}
                          stroke="#000"
                          geography={geo}
                          fill={data ? colorScale(data.new_confirmed_cases) : "#DDD"}
                          onMouseEnter={() => {

                            if(focusedStateId === 25){
                              const entry = filtered.find( c => c.county === name);
                              const {county, new_confirmed_cases, total_confirmed_cases} = entry;
                              setTooltip(<><div>County: {county}</div><div>New Cases: {new_confirmed_cases}</div><div>Total Cases: {total_confirmed_cases}</div></>);
                            }else{
                              setTooltip(name);
                            }
                          }}
                          onMouseLeave={() => {
                            setTooltip('');
                          }}
                          style={{
                             default: {

                                stroke: "#607D8B",
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
