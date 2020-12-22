import cities from '../data/cities.json';
import {Marker} from 'react-simple-maps';
import React from 'react';


const Cities = ({zoom}) =>{
    const topCities = cities.slice(0,7*zoom);
    return(
        <>
            {
                topCities.map( ({latitude,longitude,city},index) => {
                    return <Marker key={index} coordinates={[longitude,latitude]}>
                        <circle r={5/zoom} fill="#000" strokeWidth={0} stroke={"#FFF"}
                                strokeWidth={.5/zoom} />
                        <text
                            textAnchor="start"
                            x={10/zoom}
                            y={6/zoom}
                            fontSize={20/zoom}
                            fontFamily='system-ui'
                            fill={"#000"}
                            stroke={"#FFF"}
                            strokeWidth={.5/zoom}
                        >
                            {city}
                        </text>
                    </Marker>
                })
            }
        </>
    );
}

export default Cities;