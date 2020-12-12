import React,{PureComponent} from 'react';
import USMapContainer from './USMapContainer';
import {connect} from 'react-redux';
import ReactTooltip from 'react-tooltip';

class Main extends PureComponent{
  render(){
    const {tooltip,isLoading}=this.props;

    if(isLoading){
        return 'Loading';
    }

    return(
      <div>
        <div>
          <h1>US Map</h1>
        </div>
        <div>
            Source code: <a href="https://github.com/harryphan/us-district-map">Github</a>
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
    isLoading:state.boundaries.isLoading || state.covidData.isLoading
  };
}



export default connect(mapStateToProps)(Main);
