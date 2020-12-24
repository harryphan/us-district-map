import React,{memo} from 'react';
import {ComposableMap, Geographies, Geography, Marker, ZoomableGroup} from 'react-simple-maps';
import Counties from './Counties';
import statesBoundaries from '../data/states-10m.json';
import VotingLayer from './VotingLayer';
import Labels from './Labels';
import counties from '../data/counties-10m.json';
import CNNVotingDataContext from './CNNVotingDataContext';
import Cities from "./Cities";
import cities from "../data/cities.json";
import AllCounties from "./AllCounties";
import mapview_constants from "../constants/mapview_constants";
import CovidCountiesLayer from "./CDCCovidCountiesLayer";
import CNNCovidCountiesLayer from "./CNNCovidCountiesLayer";


const {BASIC,ELECTION_RESULTS_COUNTY,COVID} = mapview_constants;

const USMap = ({center,usCovidData,mapView,zoom,handleStateClick,handleMove,isLoadingCounties,nationalVotingData,focusedStateId,setTooltip}) =>{
    const votingDataContext= new CNNVotingDataContext(nationalVotingData);
  return (
      <ComposableMap  data-tip='' projection="geoAlbersUsa"  style={{border:'1px black solid',height:'100%', width:'100%'}}>
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
                        onClick={() => handleStateClick(geo,projection,path)}
                        style={{
                          default: {
                            stroke: "#000",
                            strokeWidth: 0.2,
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
            {mapView === COVID? <CNNCovidCountiesLayer counties={counties} setTooltip={setTooltip} usCovidData={usCovidData}/>:null}
            {mapView === ELECTION_RESULTS_COUNTY?<AllCounties counties={counties} setTooltip={setTooltip} votingDataContext={votingDataContext}/>:null}
          {/*<VotingLayer votingDataContext={votingDataContext} focusedStateId={focusedStateId} setTooltip={setTooltip} handleStateClick={handleStateClick} zoom={zoom}/>*/}
          {/*<Labels />*/}
            { mapView === BASIC && +focusedStateId > 0 && !isLoadingCounties ?
              <Geographies geography={counties}>
                  {
                      ({geographies, projection, path}) => {
                          votingDataContext.selectCurrentStateById(focusedStateId);
                          const focused = geographies.filter(geo => {
                              return geo.id.substring(0, 2) === focusedStateId
                          });
                          const countyLayer = <Counties countyBoundary={focused} setTooltip={setTooltip}/>;
                          // const votingCountyLayer=<VotingCountiesLayer countyBoundary={focused} votingDataContext={votingDataContext} setTooltip={setTooltip}/>;
                          return (
                              <>
                                  {countyLayer}
                                  {/*{votingCountyLayer}*/}
                              </>
                          );
                      }
                  }
              </Geographies>
            : null
          }
          {/*<Cities zoom={zoom} />*/}
        </ZoomableGroup>
      </ComposableMap>
  );
}

export default memo(USMap);
