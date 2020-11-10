import React,{PureComponent} from 'react';
import USMapContainer from './USMapContainer';
import axios from 'axios';
import {loadStatesBoundaries,loadCountiesBoundaries} from '../actions/actions'
import {connect} from 'react-redux';

class Main extends PureComponent{
  componentDidMount(){
    axios.get('/states-10m.json')
    .then(res => this.props.loadStatesBoundaries(res.data));
    axios.get('/counties-10m.json')
    .then(res => this.props.loadCountiesBoundaries(res.data));
  }
  render(){
    return(
      <div>
        <div>
          <h1>Test</h1>
        </div>
        <div>
          <USMapContainer/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state =>{

  return {

  };
}

const mapDispatchToProps = dispatch =>{
  return {
    loadStatesBoundaries:(statesBoundaries)=>{
      dispatch(loadStatesBoundaries(statesBoundaries));
    },
    loadCountiesBoundaries: (countiesBoundaries) =>{
      dispatch(loadCountiesBoundaries(countiesBoundaries));
    }
  };
}


export default connect(mapStateToProps,mapDispatchToProps)(Main);
