import React,{memo} from 'react';
import { Geographies, Geography } from "react-simple-maps";


const Counties = ({counties,covidData,focusedStateId,setTooltip}) =>{
  const filtered = covidData.filter(covid => covid.date === '11/9/2020');
  return (
            <Geographies geography={counties}>
              {({ geographies,projection,path }) => {
                const focused = geographies.filter( geo => { return +geo.id.substring(0,2) === focusedStateId});

                return(
                <>
                  {focused.map(geo => {
                      return (
                        <Geography
                          key={geo.rsmKey}
                          stroke="#000"
                          geography={geo}
                          fill="#DDD"
                          onMouseEnter={() => {
                            const { name } = geo.properties;
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
                                fill: "#ECEFF1",
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
