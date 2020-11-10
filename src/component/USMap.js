import React from 'react';
import { ComposableMap, Geographies, Geography,ZoomableGroup } from "react-simple-maps";


export const USMap = ({states,counties,center,zoom,focusedStateId,setCenter,setZoom,setFocusedState}) =>{
  function handleStateClick(geo,projection,path){
    const center = projection.invert(path.centroid(geo));
    doZoom({center,zoom:4,focusedStateId:+geo.id})
  }
  function handleMove(event,zoomEvent){
    const {zoom,coordinates} = event
    if (zoom < 4){
      setFocusedState(0);
    }
  }
  return (
      <ComposableMap projection="geoAlbersUsa">
        <ZoomableGroup center={center} zoom={zoom} onMoveEnd={handleMove}>
          <Geographies geography={states}>
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
          { focusedStateId > 0 ?
            <Geographies geography={counties}>
              {({ geographies,projection,path }) => {
                const focused = geographies.filter( geo => { return +geo.id.substring(0,2) === focusedStateId});

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
