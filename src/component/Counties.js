import React, {memo} from 'react';
import { Geography} from "react-simple-maps";

const Counties = ({countyBoundary, setTooltip}) => {
    const tooltip = (name) =>( <div>County: {name}</div>);
    return (
        <>
            {
                countyBoundary.map(geo => {
                    const {name} = geo.properties;
                    return (
                        <Geography
                            key={geo.rsmKey}
                            stroke="#000"
                            geography={geo}
                            fill={"#DDD"}
                            onMouseEnter={() => {
                                setTooltip(tooltip(name));
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
        </>
    )

}
export default memo(Counties);
