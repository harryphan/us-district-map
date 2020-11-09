import React,{useState} from 'react';
import { ComposableMap, Geographies, Geography,ZoomableGroup } from "react-simple-maps";
// import { scaleQuantize } from "d3-scale";

export const USMap = () =>{
  const countiesUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json";
  const statesURL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";
  const [center,setCenter]  = useState([0,0]);
  const [zoom,setZoom] = useState(1);
  const [id,setId] = useState(0);
  function handleStateClick(geo,projection,path){
    const centroid = projection.invert(path.centroid(geo));
    setCenter(centroid);
    setZoom(5);
    setId(+geo.id);
  }
  return (
    <ComposableMap projection="geoAlbersUsa">
      <ZoomableGroup center={center} zoom={zoom}>
        <Geographies geography={statesURL}>
          {({ geographies,projection,path }) => (
            <>
              {geographies.map(geo => (
                <Geography
                  key={geo.rsmKey}
                  stroke="#000"
                  geography={geo}
                  fill="#DDD"
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
              ))}
            </>
          )}
        </Geographies>
        { id?
          <Geographies geography={countiesUrl}>
            {({ geographies,projection,path }) => {
              const focused = geographies.filter( geo => { return +geo.id.substring(0,2) === id});

              return(
              <>
                {
                  focused.map(geo => {
                    return (
                      <Geography
                        key={geo.rsmKey}
                        stroke="#000"
                        geography={geo}
                        fill="#DDD"
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
          </Geographies>:<div>test</div>
        }
      </ZoomableGroup>
    </ComposableMap>
  );
}
