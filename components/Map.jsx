import { useState } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import { getCenter } from 'geolib';
import 'mapbox-gl/dist/mapbox-gl.css';

const Map = ({ searchResults }) => {

    const [selectedLocation, setSelectedLocation] = useState({})

    // Transform the search results object into the 
    // { latitude: 52.516272, logitude: 13.377722 } object
    const coordinates = searchResults.map(result => ({
        longitude: result.long,
        latitude: result.lat
    }))

    const center = getCenter(coordinates)

    const [viewport, setViewport] = useState({
        width: '100%',
        height: '100%',
        latitude: center.latitude - 0.07,
        longitude: center.longitude - 0.02,
        zoom: 12
    })

    console.log(selectedLocation)

    return (
        <ReactMapGL
            mapStyle={process.env.NEXT_PUBLIC_STYLE_URL}
            mapboxApiAccessToken={process.env.NEXT_PUBLIC_ACCESS_TOKEN}
            {...viewport}
            onViewportChange={viewport => setViewport(viewport)}
        >
            {searchResults.map(({ long, lat, title }) => (
                <div key={long}>
                    <Marker
                        longitude={long}
                        latitude={lat}
                        offsetLeft={-20}
                        offsetTop={-10}
                    >
                        <p 
                            role='img'
                            className='cursor-pointer text-2xl animate-bounce'
                            onClick={() => setSelectedLocation({ long, lat })}
                            aria-label='push-pin'
                        >📌</p>
                    </Marker>
                    {selectedLocation.long === long ? (
                        <Popup
                            onClose={() => setSelectedLocation({})}
                            closeOnClick={true}
                            latitude={lat}
                            longitude={long}
                            className='z-50'
                        >{title}</Popup>
                    ) : false}
                </div>
            ))}
        </ReactMapGL>
    )
}

export default Map