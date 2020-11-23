import React,{memo} from 'react';
import { ComposableMap, Geographies, Geography,ZoomableGroup } from "react-simple-maps";
import Counties from './Counties';
import { scaleLinear } from 'd3-scale';

const USMap = ({statesBoundaries,countiesBoundaries,center,zoom,usCovidData,covidData,focusedStateId,doZoom,setFocusedState,setTooltip}) =>{
  function handleStateClick(geo,projection,path){
    const center = projection.invert(path.centroid(geo));
    doZoom({center,zoom:zoom>4?zoom:4,focusedStateId:+geo.id});
  }
  function handleMove(event,zoomEvent){
    const {zoom} = event;
    if (zoom < 4){
      doZoom({center:event.coordinates,zoom,focusedStateId:0});
    }else{
      doZoom({center:event.coordinates,zoom,focusedStateId});
    }
  }
  // if(usCovidData.length === 0){
  //   return (<div/>)
  // }
  // const sorted = [...usCovidData].sort((a,b) => a.Cases_in_Last_7_Days - b.Cases_in_Last_7_Days);
  // const colorScale = scaleLinear().domain([0,sorted[sorted.length-1].Cases_in_Last_7_Days]).range(['white','red']);

  return (
      <ComposableMap data-tip='' projection="geoAlbersUsa" style=
    {{border:'1px black solid', width:'90%', height:'600px'}}>
        <ZoomableGroup center={center} zoom={zoom} onMoveEnd={handleMove}>
          <Geographies geography={statesBoundaries}>
            {({ geographies,projection,path }) =>{
              const sorted = [...usCovidData].sort((a,b) => a.Cases_in_Last_7_Days - b.Cases_in_Last_7_Days);
              const colorScale = scaleLinear().domain([0,sorted[sorted.length-1].Cases_in_Last_7_Days]).range(['white','red']);

              return geographies.map(geo => {
                const item = sorted.find((st) => st.State === geo.properties.name);

                return (
                  <Geography
                    key={geo.rsmKey}
                    stroke="#000"
                    geography={geo}
                    fill={item ? colorScale(item.Cases_in_Last_7_Days) :"#DDD"}
                    onMouseEnter={() => {
                      const { name } = geo.properties;
                      setTooltip(<div><div>{name}</div><div>{item.Cases_in_Last_7_Days}</div></div>);
                    }}
                    onMouseLeave={() => {
                      setTooltip('');
                    }}
                    onClick={() => handleStateClick(geo,projection,path)}
                    style={{
                       default: {
                          stroke: "#607D8B",
                          strokeWidth: 0.75 /zoom,
                          outline: "none",
                       },
                       hover: {
                          fill: "#CFD8DC",
                          stroke: "#607D8B",
                          strokeWidth: 1/zoom,
                          outline: "none",
                       },
                    }}
                  />
                )})
            }
          }
          </Geographies>
          { focusedStateId > 0 ?
            <Counties counties={countiesBoundaries} covidData={covidData} setTooltip={setTooltip} focusedStateId={focusedStateId}/>:null
          }
        </ZoomableGroup>
      </ComposableMap>
  );
}
export default memo(USMap);
