import {USMap} from '../component/USMap';
import {connect} from 'react-redux';
import {setCenter,setZoom,setFocusedState,doZoom} from '../actions/actions';

const mapStateToProps = state =>{
  const {states,counties} = state.boundaries;
  const {zoom,center,focusedStateId} = state.mapParams;
  return {
    states,
    counties,
    zoom,
    center,
    focusedStateId
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
    }
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(USMap);
