import { Geography} from 'react-simple-maps';

import React, {Component} from 'react';


export default class CongressCounties extends Component{
    render(){
        const {geographies,setTooltip}=this.props;
        return geographies.map(geo => {
                    const {STATE, CONG_DIST} = geo.properties;
                    return <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={'#FFF'}
                        onMouseEnter={() => {
                            setTooltip(<div>
                                <div>State: {STATE}</div>
                                <div>District: {CONG_DIST}</div>
                            </div>);
                        }}
                        onMouseLeave={() => {
                            setTooltip('');
                        }}
                        style={{
                            default: {
                                stroke: "#000",
                                strokeWidth: 0.1,
                                outline: "none",
                            },
                            hover: {
                                fill: "#CFD8DC",
                                stroke: "#607D8B",
                                strokeWidth: .1,
                                outline: "none",
                            },
                        }}
                    />
                });

    }
}