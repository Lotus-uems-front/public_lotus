import React, { useRef, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { FaMapPin } from 'react-icons/fa'
import L from 'leaflet'

const Map = ({ cities }) => {
  const mapRef = useRef()
  const setBoundsForMap = (map) => {
    // Set a bounding box around Russia's approximate borders
    const bounds = [
      //   [40, 20],   // Southwest coordinates
      //   [80, 190]  // Northeast coordinates
      [50, 20],   // Southwest coordinates (increase the latitude to show less from the bottom)
      [70, 190]  
    ]
    map.setMaxBounds(bounds)
  }

  const customIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [20, 36], // size of the icon
    iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
    shadowSize: [41, 41], // size of the shadow
    shadowAnchor: [13, 41], // the same for the shadow
    popupAnchor: [0, -41] // point from which the popup should open relative to the iconAnchor
  })

  return (
    <MapContainer
      center={[61.524, 105.3188]}
      zoom={3.496}
      style={{ height: '500px', width: '1300px' }}
      ref={mapRef}
    >
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        whenCreated={setBoundsForMap}
      />
      {cities &&
        Object.entries(cities).map(([cityName, cityInfo], index) => {
          console.log(Object.keys(cityInfo)[0])
          const location = Object.values(cityInfo)[0]?.geo || [0, 0] // Simplified extraction
          if (
            !location ||
            location.length !== 2 ||
            typeof location[0] !== 'number' ||
            typeof location[1] !== 'number'
          ) {
            console.error(`Invalid coordinates for ${cityName}:`, location)
            return null // skip rendering this city
          }
          return (
            <Marker key={index} position={location} icon={customIcon}>
              {/* {Object.keys(cityInfo)[0]} */}
              <Tooltip permanent>
                {Object.keys(cityInfo)[0] || 'CITY NAME'}
                {/* <FaMapPin /> */}
              </Tooltip>
            </Marker>
          )
        })}
    </MapContainer>
  )
}

export default Map
