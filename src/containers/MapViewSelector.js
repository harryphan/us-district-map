import {connect} from "react-redux";
import MapViewSelector from "../component/MapViewSelector";
import {setMapView} from "../actions/actions";

const mapStateToProps = (state) =>{
    return {
        mapView: state.dashboard.mapView
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        changeMapView(event) {
            dispatch(setMapView(event.target.value));
        },
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(MapViewSelector);