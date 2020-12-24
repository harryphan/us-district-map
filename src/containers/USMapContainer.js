import React,{Component} from "react";
import USMap from '../component/USMap';
import {connect} from 'react-redux';
import {setCenter,setZoom,setFocusedState,doZoom,setTooltip} from '../actions/actions';
import ReactTooltip from "react-tooltip";
import { Typography} from "@material-ui/core";


class Template extends Component{
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    const focusChanged = this.props.focusedStateId !== nextProps.focusedStateId;
    const mapViewChanged = this.props.mapView !== nextProps.mapView;
    const isLoadingChanged = this.props.isLoading !== nextProps.isLoading;
    const tooltipChanged = this.props.tooltip !== nextProps.tooltip;
    return focusChanged || mapViewChanged || isLoadingChanged || tooltipChanged;
  }

  render(){
    const {isLoading,tooltip}=this.props;
    if(isLoading){
      return <Typography style={{border:'1px black solid',height:'100%', width:'100%'}}>Loading</Typography>;
    }
    return(<>
            <USMap {...this.props} />
            <ReactTooltip>{tooltip}</ReactTooltip>
          </>
    )
  }
}

const mapStateToProps = state =>{
  const {zoom,center,focusedStateId} = state.mapParams;
  return {
    zoom,
    center,
    focusedStateId,
    tooltip:state.mapParams.tooltip,
    isLoading:state.votingData.isLoading || state.votingData.isLoadingCounties || state.covidData.isLoading,
    isLoadingCounties: state.votingData.isLoadingCounties,
    gaVotingData: state.votingData.ga,
    usCovidData: state.covidData.us,
    covidData: state.covidData.ma,
    nationalVotingData : state.votingData.us,
    mapView: state.dashboard.mapView,
  };
}

const mapDispatchToProps = (dispatch) =>{
  return {
    setCenter:(center)=>{
      dispatch(setCenter(center));
    },
    setFocusedState:(id)=>{
      dispatch(setFocusedState(id));
    },
    setTooltip(payload){
      dispatch(setTooltip(payload));
    },
    handleMove(event,focusedStateId){
      const {zoom,coordinates} = event;
      dispatch(doZoom({center:coordinates,zoom,focusedStateId : zoom < 4 ? '0' : focusedStateId}));
    },
    handleStateClick(geo,projection,path,stateAbbr,zoom){
      const center = projection.invert(path.centroid(geo));
      //dispatch(fetchStateVotingData(stateAbbr));
      dispatch(doZoom({center,zoom:zoom>4?zoom:4,focusedStateId:geo.id}));
    }
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Template);
