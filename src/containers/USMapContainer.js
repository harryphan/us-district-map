import USMap from '../component/USMap';
import {connect} from 'react-redux';
import {setCenter,setZoom,setFocusedState,doZoom,setTooltip} from '../actions/actions';
import {fetchStateVotingData} from "../reducers/votingData";

const mapStateToProps = state =>{
  const {zoom,center,focusedStateId} = state.mapParams;
  return {
    zoom,
    center,
    focusedStateId,
    isLoadingCounties: state.votingData.isLoadingCounties,
    gaVotingData: state.votingData.ga,
    usCovidData: state.covidData.us,
    covidData: state.covidData.ma,
    nationalVotingData : state.votingData.us,
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
    },
    fetchStateVotingData(stateAbbr){
      dispatch(fetchStateVotingData(stateAbbr));
    }
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(USMap);
