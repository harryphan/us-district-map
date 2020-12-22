import React,{memo} from 'react';
import {Annotation, ComposableMap, Geographies, Geography, Marker, ZoomableGroup} from 'react-simple-maps';
import Counties from './Counties';
import { geoCentroid } from 'd3-geo';
import allStates from '../data/allstates.json';
import statesBoundaries from '../data/states-10m.json';

import { scaleLog,scaleLinear } from 'd3-scale';
import * as d3 from 'd3';

const USMap = ({center,zoom,usCovidData,isLoadingCounties,covidData,fetchStateVotingData,gaVotingData,nationalVotingData,focusedStateId,doZoom,setFocusedState,setTooltip}) =>{
  async function handleStateClick(geo,projection,path,stateAbbr){
    const center = projection.invert(path.centroid(geo));
    fetchStateVotingData(stateAbbr);
    doZoom({center,zoom:zoom>4?zoom:4,focusedStateId:geo.id});
  }
  function handleMove(event,zoomEvent){
    const {zoom} = event;
    if (zoom < 4){
      doZoom({center:event.coordinates,zoom,focusedStateId:'0'});
    }else{
      doZoom({center:event.coordinates,zoom,focusedStateId});
    }
  }
  const offsets = {
    VT: [50, -8],
    NH: [34, 2],
    MA: [30, -1],
    RI: [28, 2],
    CT: [35, 10],
    NJ: [34, 1],
    DE: [33, 0],
    MD: [47, 10],
    DC: [49, 21]
  };

  let sorted=[...nationalVotingData].sort( (a,b) =>
      a.totalVotes - b.totalVotes
  );
  const voteOpScale = scaleLinear().domain([sorted[0].totalVotes,sorted[sorted.length-2].totalVotes]).range([0,1]);
  return (
      <ComposableMap data-tip='' projection="geoAlbersUsa" style=
    {{border:'1px black solid', width:'90%', height:'600px'}}>
        <ZoomableGroup center={center} zoom={zoom} onMoveEnd={handleMove}>
          <Geographies
              geography={statesBoundaries}
          >

            {({ geographies,projection,path }) =>{
              const usMap=geographies.map(geo => {
                const stateResult = nationalVotingData.find( s => s.id === geo.id);
                const bidenResult = stateResult? stateResult.candidates.find( c => c.id === 1036  ): {};
                const trumpResult = stateResult? stateResult.candidates.find( c => c.id !== 1036  ): {};
                const total =bidenResult.votes+trumpResult.votes
                const voteRatio = bidenResult.id ? bidenResult.votes/total :0;
                return (
                    <Geography
                        key={geo.rsmKey}
                        stroke="#000"
                        geography={geo}
                        fill={!(!stateResult || focusedStateId ==geo.id)? d3.color(voteRatio>=.5? '#00F':'#F00').copy({opacity:voteOpScale(total)}) :"#DDD"}
                        onMouseEnter={() => {
                          const { name } = geo.properties;
                          setTooltip(<div>
                            <div>{name}</div>
                            <div>Total votes: {stateResult.totalVotes}</div>
                            <div>Biden: {bidenResult.votes}</div>
                            <div>Trump: {trumpResult.votes}</div>
                          </div>);
                        }}
                        onMouseLeave={() => {
                          setTooltip('');
                        }}
                        onClick={() => handleStateClick(geo, projection, path,stateResult.state)}
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

              const labels=geographies.map(geo => {
                const centroid = geoCentroid(geo);
                const cur = allStates.find(s => s.val === geo.id);
                return (
                    <g key={geo.rsmKey + "-name"}>
                      {cur &&
                      centroid[0] > -160 &&
                      centroid[0] < -67 &&
                      (Object.keys(offsets).indexOf(cur.id) === -1 ? (
                          <Marker coordinates={centroid}>
                            <text y="2" fontSize={14} textAnchor="middle">
                              {cur.id}
                            </text>
                          </Marker>
                      ) : (
                          <Annotation
                              subject={centroid}
                              dx={offsets[cur.id][0]}
                              dy={offsets[cur.id][1]}
                          >
                            <text x={4} fontSize={14} alignmentBaseline="middle">
                              {cur.id}
                            </text>
                          </Annotation>
                      ))}
                    </g>
                );
              });
              return <>
                {usMap}
                {/*{labels}*/}
              </>
            }
          }
          </Geographies>
          { +focusedStateId > 0 && !isLoadingCounties?
            <Counties covidData={covidData} stateVotingData={nationalVotingData.find(data => data.id === focusedStateId)} gaVotingData={gaVotingData} setTooltip={setTooltip} focusedStateId={focusedStateId}/>:null
          }
        </ZoomableGroup>
      </ComposableMap>
  );
}

export default memo(USMap);
