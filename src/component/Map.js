import React,{memo} from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import {geoPath,geoAlbersUsa} from 'd3-geo';
import TestCounties from './TestCounties';

const Map = ({statesBoundaries,countiesBoundaries,center,covidData,focusedStateId,doZoom,setFocusedState,setTooltip}) =>{
  if(statesBoundaries == null){
    return <div>Loading...</div>;
  }
  const width = 975;
  const height = 610;
  const projection = geoAlbersUsa();
  const path= geoPath(projection);

  const zoom = d3.zoom()
      .scaleExtent([1, 8])
      .on("zoom", zoomed);

  const svg = d3.select('svg')
      .attr("viewBox", [0, 0, width, height])
      .on("click", reset);

  const g = d3.select('.states');
  const states = d3.select('.holder')
      .attr("fill", "#bbb")
      .attr('stroke-width','1')
      .attr('stroke','white')
      .attr("cursor", "pointer")
    .selectAll("path")
    .data(topojson.feature(statesBoundaries, statesBoundaries.objects.states).features)
    .join("path")
      .on("click", clicked)
      .attr("d", path);

  // states.append("title")
  //     .text(d => d.properties.name);
  // const county=d3.select('.county');
  // if(focusedStateId!=0){
  //   county.selectAll('.countyborder').remove();
  //   county.append("path")
  //     .attr('class','countyborder')
  //     .datum(topojson.mesh(countiesBoundaries, countiesBoundaries.objects.counties, (a, b) => a.id.substring(0,2) ==focusedStateId ))
  //     .enter()
  //     .join("path")
  //     .attr("fill", "none")
  //     .attr("stroke", "white")
  //     .attr("stroke-linejoin", "round")
  //     .attr("d", path);
  // }

  svg.call(zoom);

  function reset() {
    states.transition().style("fill", null);
    setFocusedState(0);
    svg.transition().duration(750).call(
      zoom.transform,
      d3.zoomIdentity,
      d3.zoomTransform(svg.node()).invert([width / 2, height / 2])
    );
  }

  function clicked(event, d) {
    setFocusedState(d.id);
    const [[x0, y0], [x1, y1]] = path.bounds(d);
    event.stopPropagation();
    states.transition().style("fill", null);
    d3.select(this).transition().style("fill", "red");
    svg.transition().duration(750).call(
      zoom.transform,
      d3.zoomIdentity
        .translate(width / 2, height / 2)
        .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height)))
        .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
      d3.pointer(event, svg.node())
    );
  }

  function zoomed(event) {
    const {transform} = event;
    g.attr("transform", transform);
    g.attr("stroke-width", 1 / transform.k);
    states.attr("stroke-width", 1 / transform.k);
  }


  return (
      <div className="test" >
      <svg>
        <g className="states">
          <g className="holder"/>
          <TestCounties countiesBoundaries={countiesBoundaries} path={path} covidData={covidData} setTooltip={setTooltip} focusedStateId={focusedStateId}/>
        </g>
      </svg>
      </div>
  );
}
export default memo(Map);
