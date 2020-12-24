import {setTooltip} from "../actions/actions";
import {connect} from "react-redux";
import AllCounties from "../component/AllCounties";
import CNNVotingDataContext from "../component/CNNVotingDataContext";


const mapStateToProps = (state,ownProps)=>{
    return {
        votingDataContext:state.votingData.dataContext,
        ownProps
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        setTooltip(payload){
            dispatch(setTooltip(payload));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AllCounties)