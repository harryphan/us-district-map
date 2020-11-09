import React from 'react';
import { ComposableMap, Geographies, Geography,ZoomableGroup } from "react-simple-maps";
// import { scaleQuantize } from "d3-scale";

export const USMap = () =>{
  const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json";

  return (
    <ComposableMap projection="geoAlbersUsa">
    <ZoomableGroup zoom={1}>
      <Geographies geography={geoUrl}>
        {({ geographies }) => (
          <>
            {geographies.map(geo => (
              <Geography
                key={geo.rsmKey}
                stroke="#FFF"
                geography={geo}
                fill="#DDD"
              />
            ))}

          </>
        )}
      </Geographies>
      </ZoomableGroup>
    </ComposableMap>
  );
}
