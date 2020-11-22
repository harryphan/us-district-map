import React,{PureComponent} from 'react';
import USMapContainer from './USMapContainer';
import axios from 'axios';
import {loadStatesBoundaries,loadCountiesBoundaries,loadCovid} from '../actions/actions'
import {connect} from 'react-redux';
import ReactTooltip from 'react-tooltip';
import { csv } from 'd3-fetch';

class Main extends PureComponent{
  componentDidMount(){
    axios.get('/states-10m.json')
    .then(res => this.props.loadStatesBoundaries(res.data));
    axios.get('/counties-10m.json')
    .then(res => this.props.loadCountiesBoundaries(res.data));
    csv('/covid.csv').then( covid => this.props.loadCovid(covid));
  }
  render(){
    const {tooltip}=this.props;
    return(
      <div>
        <div>
          <h1>US Map</h1>
        </div>
        <div style={{padding:'5'}}>
          <USMapContainer/>
          <ReactTooltip>{tooltip}</ReactTooltip>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state =>{

  return {
    tooltip:state.mapParams.tooltip,
  };
}

const mapDispatchToProps = dispatch =>{
  return {
    loadStatesBoundaries:(statesBoundaries)=>{
      dispatch(loadStatesBoundaries(statesBoundaries));
    },
    loadCountiesBoundaries: (countiesBoundaries) =>{
      dispatch(loadCountiesBoundaries(countiesBoundaries));
    },
    loadCovid: (covid) =>{
      dispatch(loadCovid(covid));
    }
  };
}


export default connect(mapStateToProps,mapDispatchToProps)(Main);
