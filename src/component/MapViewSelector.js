import {PureComponent} from "react";
import {FormControl, InputLabel, Select} from "@material-ui/core";
import mapview_constants from '../constants/mapview_constants';
const {BASIC,ELECTION_RESULTS_COUNTY} = mapview_constants;

export default class MapViewSelector extends PureComponent{
    render(){
        const {changeMapView,mapView} = this.props;
        return(
            <FormControl >
                <Select
                    native
                    defaultValue={mapView}
                    onChange={changeMapView}
                >
                    <option value={BASIC}>Basic</option>
                    <option value={ELECTION_RESULTS_COUNTY}>County Votes</option>
                </Select>
            </FormControl>
        )
    }
}