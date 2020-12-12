import React,{PureComponent} from 'react';
import USMapContainer from './USMapContainer';
import {connect} from 'react-redux';
import ReactTooltip from 'react-tooltip';

class Main extends PureComponent{
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



export default connect(mapStateToProps)(Main);
