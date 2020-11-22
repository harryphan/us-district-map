import React,{memo} from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import {geoPath,geoAlbersUsa} from 'd3-geo';

const Map = ({statesBoundaries,countiesBoundaries,center,covidData,focusedStateId,doZoom,setFocusedState,setTooltip}) =>{
  if(statesBoundaries == null){
    return <div>Loading...</div>;
  }
  console.log(countiesBoundaries);
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
      .attr("fill", "#444")
      .attr('stroke-width','1')
      .attr('stroke','white')
      .attr("cursor", "pointer")
    .selectAll("path")
    .data(topojson.feature(statesBoundaries, statesBoundaries.objects.states).features)
    .join("path")
      .on("click", clicked)
      .attr("d", path);

  states.append("title")
      .text(d => d.properties.name);
  if(focusedStateId!=0){
    const paths = countiesBoundaries.objects.counties.geometries.filter(x => x.id.substring(0,2) == focusedStateId);
    g.selectAll('.countyborder').remove();
    g.append("path")
      .attr('class','countyborder')
        .attr("fill", "none")
        .attr("stroke", "white")
        .attr("stroke-linejoin", "round")
        .attr("d", path(topojson.mesh(countiesBoundaries, countiesBoundaries.objects.counties, (a, b) => a.id.substring(0,2) ==focusedStateId )));
  }

  svg.call(zoom);

  function reset() {
    states.transition().style("fill", null);
    setFocusedState(0);
    g.selectAll('.countyborder').remove();
    svg.transition().duration(750).call(
      zoom.transform,
      d3.zoomIdentity,
      d3.zoomTransform(svg.node()).invert([width / 2, height / 2])
    );
  }

  function clicked(event, d) {
    const [[x0, y0], [x1, y1]] = path.bounds(d);
    event.stopPropagation();
    states.transition().style("fill", null);
    d3.select(this).transition().style("fill", "red");
    console.log(d.id);
    doZoom({center:[0,0],zoom:1,focusedStateId:+d.id});
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
        </g>
      </svg>
      </div>
  );
}
export default memo(Map);
