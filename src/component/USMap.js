import React,{memo} from 'react';
import { ComposableMap, Geographies, Geography,ZoomableGroup } from "react-simple-maps";
import Counties from './Counties';

const USMap = ({statesBoundaries,countiesBoundaries,center,zoom,covidData,focusedStateId,doZoom,setFocusedState,setTooltip}) =>{
  function handleStateClick(geo,projection,path){
    const center = projection.invert(path.centroid(geo));
    doZoom({center,zoom:4,focusedStateId:+geo.id});
  }
  function handleMove(event,zoomEvent){
    const {zoom} = event;
    if (zoom < 4){
      setFocusedState(0);
    }
  }
  return (
      <ComposableMap data-tip='' projection="geoAlbersUsa" style=
    {{border:'1px black solid', width:'90%', height:'600px'}}>
        <ZoomableGroup center={center} zoom={zoom} onMoveEnd={handleMove}>
          <Geographies geography={statesBoundaries}>
            {({ geographies,projection,path }) =>
              geographies.map(geo => (
                  <Geography
                    key={geo.rsmKey}
                    stroke="#000"
                    geography={geo}
                    fill="#DDD"
                    onMouseEnter={() => {
                      const { name } = geo.properties;
                      setTooltip(name);
                    }}
                    onMouseLeave={() => {
                      setTooltip('');
                    }}
                    onClick={() => handleStateClick(geo,projection,path)}
                    style={{
                       default: {
                          fill: "#ECEFF1",
                          stroke: "#607D8B",
                          strokeWidth: 0.75,
                          outline: "none",
                       },
                       hover: {
                          fill: "#CFD8DC",
                          stroke: "#607D8B",
                          strokeWidth: 1,
                          outline: "none",
                       },
                    }}
                  />
                ))
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
