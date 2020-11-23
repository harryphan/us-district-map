import React,{memo} from 'react';
import { scaleLinear } from 'd3-scale';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';


const TestCounties = ({countiesBoundaries,path,covidData,focusedStateId,setTooltip}) =>{
  const county=d3.select('.county');
  county.selectAll('.countyborder').remove();
  var div = d3.select('body').append("div")
     .attr("class", "tooltip-donut")
     .style("opacity", 0).style('position','absolute');
  if(focusedStateId !== 0){
    const div=county.append("div")
     .attr("class", "tooltip")
     .style("opacity", 0);
    county.selectAll('.countyborder').remove();
    county.append('path')
      .attr('class','countyborder')
      .datum(topojson.mesh(countiesBoundaries, countiesBoundaries.objects.counties, (a, b) => a.id.substring(0,2) === focusedStateId ))
      .attr('d',path)
        .attr('fill', 'none')
        .attr('stroke', 'white')
        .on('mouseover',handleMouseover)
        .on('mouseout',handleMouseout);

  }
  function handleMouseover(data, i){
    console.log(i)
    div.style("left", (data.pageX + 10) + "px")
               .style("top", (data.pageY - 15) + "px").style("opacity", 1).html(11);

  }
  function handleMouseout(data){
    div.style("opacity", 0);
  }
  return(
    <g className="county"/>
  );
}
export default TestCounties;
