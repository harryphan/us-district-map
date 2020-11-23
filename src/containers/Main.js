import React,{PureComponent} from 'react';
import USMapContainer from './USMapContainer';
import axios from 'axios';
import {loadStatesBoundaries,loadCountiesBoundaries,loadCovid,loadUSCovid} from '../actions/actions'
import {connect} from 'react-redux';
import ReactTooltip from 'react-tooltip';
import { csv } from 'd3-fetch';

class Main extends PureComponent{
  constructor(props){
    super(props);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
  }
  componentDidMount(){
    axios.get('/states-10m.json')
    .then(res => this.props.loadStatesBoundaries(res.data));
    axios.get('/counties-10m.json')
    .then(res => this.props.loadCountiesBoundaries(res.data));
    csv('/covid.csv').then( covid => this.props.loadCovid(covid));
    csv('/united_states_covid19_cases_and_deaths_by_state.csv').then(covid => this.props.loadUSCovid(covid));
  }
  handleDoubleClick(event){
    console.log('blog')
  }
  render(){
    const {tooltip}=this.props;
    return(
      <div>
        <div>
          <h1>US Map</h1>
        </div>
        <div style={{padding:'5'}} onDoubleClick={this.handleDoubleClick}>
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
    },
    loadUSCovid: (covid) =>{
      dispatch(loadUSCovid(covid));
    }
  };
}


export default connect(mapStateToProps,mapDispatchToProps)(Main);
