import {setTooltip} from '../actions/actions';
import {connect} from 'react-redux';
import CongressCounties from "../component/CongressCounties";


const mapStateToProps = (state,ownProps)=>{
    return {
        ownProps
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setTooltip(payload) {
            dispatch(setTooltip(payload));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CongressCounties)