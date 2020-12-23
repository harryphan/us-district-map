import {connect} from 'react-redux';
import Main from "../component/Main";

const mapStateToProps = state =>{
  return {
    tooltip:state.mapParams.tooltip,
    isLoading:state.votingData.isLoading || state.votingData.isLoadingCounties,
  };
}

export default connect(mapStateToProps)(Main);
