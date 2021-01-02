import counties from '../data/counties-10m.json';
import {Geographies} from 'react-simple-maps';
import React from 'react';
import mapview_constants from '../constants/mapview_constants';
import CNNCovidCountiesContainer from '../containers/CNNCovidCountiesContainer';
import FocusedStateCountiesContainer from '../containers/FocusedStateCountiesContainer';
import ElectionResultsCounties from '../containers/ElectionResultsCounties';
import congressDistricts from '../data/US-district-current.topo.json';
import CongressCountiesContainer from '../containers/CongressCountiesContainer';

const {BASIC,ELECTION_RESULTS_COUNTY,COVID,CONGRESS} = mapview_constants;
const Layers = ({mapView,focusedStateId})=> {
    const currrentCounties=mapView === CONGRESS?congressDistricts:counties;
    return <Geographies geography={currrentCounties}
                 parseGeographies={(geos) => {
                     switch (mapView) {
                         case BASIC:
                             return geos.filter(geo => geo.id.substring(0, 2) === focusedStateId)
                         // case CONGRESS:
                         //     console.log(geos);
                         //     return geos.filter(geo => geo.id === '31101');
                         default:
                             return geos;
                     }
                 }} >
        {
            ({geographies, projection, path}) => {
                switch (mapView) {
                    case COVID:
                        return <CNNCovidCountiesContainer geographies={geographies}/>;
                    case ELECTION_RESULTS_COUNTY:
                        return <ElectionResultsCounties geographies={geographies} />;
                    case CONGRESS:
                        return <CongressCountiesContainer  geographies={geographies}/>
                    default:
                        return <FocusedStateCountiesContainer geographies={geographies}/>;
                }

            }
        }
    </Geographies>
};

export default Layers;