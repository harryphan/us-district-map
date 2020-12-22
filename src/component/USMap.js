import React,{memo} from 'react';
import {ComposableMap, Geographies, Geography, Marker, ZoomableGroup} from 'react-simple-maps';
import Counties from './Counties';
import statesBoundaries from '../data/states-10m.json';
import VotingLayer from './VotingLayer';
import Labels from './Labels';
import counties from '../data/counties-10m.json';
import CNNVotingDataContext from './CNNVotingDataContext';
import VotingCountiesLayer from './VotingCountiesLayer';
import Cities from "./Cities";
import cities from "../data/cities.json";

const USMap = ({center,zoom,handleStateClick,handleMove,isLoadingCounties,nationalVotingData,focusedStateId,setTooltip}) =>{
    const votingDataContext= new CNNVotingDataContext(nationalVotingData);
    const stuff=[
        {
            "city": "New York",
            "growth_from_2000_to_2013": "4.8%",
            "latitude": 40.7127837,
            "longitude": -74.0059413,
            "population": "8405837",
            "rank": "1",
            "state": "New York"
        },
        {
            "city": "Los Angeles",
            "growth_from_2000_to_2013": "4.8%",
            "latitude": 34.0522342,
            "longitude": -118.2436849,
            "population": "3884307",
            "rank": "2",
            "state": "California"
        }];
  return (
      <ComposableMap data-tip='' projection="geoAlbersUsa" style={{border:'1px black solid', width:'90%', height:'600px'}}>
        <ZoomableGroup center={center} zoom={zoom} onMoveEnd={(event,zoomEvent)=>handleMove(event,focusedStateId)}>
          <Geographies geography={statesBoundaries}>
            {({ geographies,projection,path }) =>{
              const usMap=geographies.map(geo => {
                return (
                    <Geography
                        key={geo.rsmKey}
                        stroke="#000"
                        geography={geo}
                        fill={"#FFF"}
                        onMouseEnter={() => {
                          setTooltip(<div>{geo.properties.name}</div>);
                        }}
                        onMouseLeave={() => {
                          setTooltip('');
                        }}
                        style={{
                          default: {
                            stroke: "#000",
                            strokeWidth: 0.5 / zoom,
                            outline: "none",
                          },
                          hover: {
                            fill: "#CFD8DC",
                            stroke: "#607D8B",
                            strokeWidth: 1 / zoom,
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
          <VotingLayer votingDataContext={votingDataContext} focusedStateId={focusedStateId} setTooltip={setTooltip} handleStateClick={handleStateClick} zoom={zoom}/>
          {/*<Labels />*/}

          { +focusedStateId > 0 && !isLoadingCounties ?
              <Geographies geography={counties}>
                  {
                      ({geographies, projection, path}) => {
                          votingDataContext.selectCurrentStateById(focusedStateId);
                          const focused = geographies.filter(geo => {
                              return geo.id.substring(0, 2) === focusedStateId
                          });
                          const countyLayer = <Counties countyBoundary={focused} setTooltip={setTooltip}/>;
                          const votingCountyLayer=<VotingCountiesLayer countyBoundary={focused} votingDataContext={votingDataContext} setTooltip={setTooltip}/>;
                          return (
                              <>
                                  {countyLayer}
                                  {votingCountyLayer}
                              </>
                          );
                      }
                  }
              </Geographies>
            : null
          }
          <Cities zoom={zoom} />
        </ZoomableGroup>
      </ComposableMap>
  );
}

export default memo(USMap);
