import USMap from '../component/USMap';
import {connect} from 'react-redux';
import {setCenter,setZoom,setFocusedState,doZoom,setTooltip} from '../actions/actions';

const mapStateToProps = state =>{
  const {states,counties} = state.boundaries;
  const {zoom,center,focusedStateId} = state.mapParams;
  return {
    statesBoundaries:states,
    countiesBoundaries:counties,
    zoom,
    center,
    focusedStateId,
    usCovidData: state.covidData.us,
    covidData: state.covidData.ma,
  };
}

const mapDispatchToProps = dispatch =>{
  return {
    setCenter:(center)=>{
      dispatch(setCenter(center));
    },
    setZoom:(zoom)=>{
      dispatch(setZoom(zoom));
    },
    setFocusedState:(id)=>{
      dispatch(setFocusedState(id));
    },
    doZoom(payload){
      dispatch(doZoom(payload));
    },
    setTooltip(payload){
      dispatch(setTooltip(payload));
    }
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(USMap);
