import counties from "../data/counties-10m.json";
import {Geographies, Geography} from "react-simple-maps";
import React from "react";
import mapview_constants from "../constants/mapview_constants";
import CNNCovidCountiesContainer from "../containers/CNNCovidCountiesContainer";
import FocusedStateCountiesContainer from "../containers/FocusedStateCountiesContainer";
import ElectionResultsCounties from "../containers/ElectionResultsCounties";

const {BASIC,ELECTION_RESULTS_COUNTY,COVID} = mapview_constants;
const Layers = ({mapView,focusedStateId})=> {
    return <Geographies geography={counties}
                 parseGeographies={(geos) => mapView === BASIC
                     ? geos.filter(geo => geo.id.substring(0, 2) === focusedStateId)
                     : geos}>
        {
            ({geographies, projection, path}) => {
                switch (mapView) {
                    case COVID:
                        return <CNNCovidCountiesContainer geographies={geographies}/>;
                    case ELECTION_RESULTS_COUNTY:
                        return <ElectionResultsCounties geographies={geographies} />;
                    default:
                        return <FocusedStateCountiesContainer geographies={geographies}/>;
                }

            }
        }
    </Geographies>
};

export default Layers;