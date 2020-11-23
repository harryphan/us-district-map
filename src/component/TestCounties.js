import React,{memo} from 'react';
import { scaleLinear } from 'd3-scale';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';

const TestCounties = ({countiesBoundaries,path,covidData,focusedStateId,setTooltip}) =>{

  console.log('blah');
  if(focusedStateId !== 0){
    const county=d3.select('.county');
    county.selectAll('.countyborder').remove();
    county.append('path')
      .attr('class','countyborder')
        .attr('fill', 'none')
        .attr('stroke', 'white')
        .attr('stroke-linejoin', 'round')
        .attr('d', path(topojson.mesh(countiesBoundaries, countiesBoundaries.objects.counties, (a, b) => a.id.substring(0,2) === focusedStateId )));
  }
  return(
    <g className="county"/>
  );
}
export default memo(TestCounties);
