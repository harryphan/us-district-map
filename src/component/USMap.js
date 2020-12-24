import React, {Component} from 'react';
import {ComposableMap, Geographies, Geography, Marker, ZoomableGroup} from 'react-simple-maps';
import CNNVotingDataContext from './CNNVotingDataContext';
import BasicMapLayer from "./BasicMapLayer";
import Layers from "./Layers";


class USMap extends Component{
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const mapViewChange = this.props.mapView !== nextProps.mapView;
        const focusStateChannge = this.props.focusedStateId !== nextProps.focusedStateId;
        return mapViewChange || focusStateChannge;
    }

    render(){
        const {center,mapView,zoom,handleStateClick,handleMove,focusedStateId,setTooltip} = this.props;
        return (
            <ComposableMap  data-tip='' projection="geoAlbersUsa"  style={{border:'1px black solid',height:'100%', width:'100%'}}>
                <ZoomableGroup center={center} zoom={zoom} onMoveEnd={(event,zoomEvent)=>handleMove(event,focusedStateId)}>
                    <BasicMapLayer setTooltip={setTooltip} handleStateClick={handleStateClick}/>
                    <Layers mapView={mapView} focusedStateId={focusedStateId}/>


                    {/*<VotingLayer votingDataContext={votingDataContext} focusedStateId={focusedStateId} setTooltip={setTooltip} handleStateClick={handleStateClick} zoom={zoom}/>*/}
                    {/*<Labels />*/}

                    {/*<Cities zoom={zoom} />*/}
                </ZoomableGroup>
            </ComposableMap>
        );
    }
}

export default USMap;
