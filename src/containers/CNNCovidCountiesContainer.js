import CNNCovidCountiesLayer from "../component/CNNCovidCountiesLayer";
import {connect} from "react-redux";
import {setTooltip} from "../actions/actions";


const mapStateToProps = (state,ownProps)=>{
    return {
        usCovidData : state.covidData.us,
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

export default connect(mapStateToProps,mapDispatchToProps)(CNNCovidCountiesLayer)