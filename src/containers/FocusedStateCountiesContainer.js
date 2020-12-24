import {setTooltip} from "../actions/actions";
import {connect} from "react-redux";
import React, {PureComponent} from "react";
import {Geography} from "react-simple-maps";


class StateCounties extends PureComponent{
    render(){
        const {geographies,focusedStateId,setTooltip} = this.props;
        if(+focusedStateId ==0 )
            return <></>;
        return geographies.map(geo => {
            const {name} = geo.properties;
            const tooltip=<div>{name + ' '+geo.id }</div>;
            return (
                <Geography
                    key={geo.rsmKey}
                    stroke="#000"
                    geography={geo}
                    fill={"#DDD"}
                    onMouseEnter={() => {
                        setTooltip(tooltip);
                    }}
                    onMouseLeave={() => {
                        setTooltip('');
                    }}
                    style={{
                        default: {
                            stroke: "#FFFFFF",
                            strokeWidth: 0.1,
                            outline: "none",
                        },
                        hover: {
                            fill: "#CFD8DC",
                            stroke: "#607D8B",
                            strokeWidth: 0.2,
                            outline: "none",
                        },
                    }}
                />
            )
        })
    }
}

const mapStateToProps = (state,ownProps)=>{
    return {
        usCovidData : state.covidData.us,
        focusedStateId: state.mapParams.focusedStateId,
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

export default connect(mapStateToProps,mapDispatchToProps)(StateCounties)