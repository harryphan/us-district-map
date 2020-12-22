import React, { memo} from 'react';
import { Geography } from 'react-simple-maps';

const VotingCountiesLayer = ({countyBoundary,votingDataContext, focusedStateId, setTooltip}) => {
    return (
        <>
            {countyBoundary.map(geo => {
                const {name} = geo.properties;
                votingDataContext.selectCurrentCountyById(geo.id);
                const countyColor = votingDataContext.getCountyColor(focusedStateId);
                const countyTooltip = votingDataContext.getCountyTooltip(name);
                return (
                    <Geography
                        key={geo.rsmKey}
                        stroke="#000"
                        geography={geo}
                        fill={countyColor}
                        onMouseEnter={() => {
                            setTooltip(countyTooltip);
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
export default memo(VotingCountiesLayer);
