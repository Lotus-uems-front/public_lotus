import React, { useRef, useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { FaMapPin } from 'react-icons/fa'
import L from 'leaflet'
import s from './style/Map.module.scss'

const Map = ({ cities }) => {
  const mapRef = useRef()
  const [activePopup, setActivePopup] = useState(null)
  const setBoundsForMap = (map) => {
    const bounds = [
      [55, 20],
      [75, 190]
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

  const handleMarkerClick = (cityInfo) => {
    console.log(cityInfo)
  }

  const popupsRef = useRef({})

  useEffect(() => {
    if (activePopup && popupsRef.current[activePopup]) {
      popupsRef.current[activePopup].openOn(mapRef.current.leafletElement)
    }
  }, [activePopup])

  return (
    <MapContainer center={[55.524, 45.3188]} zoom={4.5} className={s.map} ref={mapRef}>
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        whenCreated={setBoundsForMap}
      />
      {cities &&
        Object.entries(cities).map(([cityIndex, cityInfo], index) => {
          console.log(Object.keys(cityInfo)[0])
          const cityName = Object.keys(cityInfo)[0]
          const cityData = Object.values(cityInfo)[0]
          const location = Object.values(cityInfo)[0]?.geo || [0, 0]
          if (
            !location ||
            location.length !== 2 ||
            typeof location[0] !== 'number' ||
            typeof location[1] !== 'number'
          ) {
            console.error(`Invalid coordinates for ${cityName}:`, location)
            return null
          }
          return (
            <Marker
              key={index}
              icon={customIcon}
              position={location}
              eventHandlers={{
                click: () => handleMarkerClick(cityInfo)
              }}
            >
                <Tooltip
                  permanent
                  eventHandlers={{
                    click: () => {
                      setActivePopup(cityName || 'CITY NAME') // Set the active popup by city name
                    }
                  }}
                >
                  {`${cityName || 'CITY NAME'} (${cityData?.companies.length})`}
                </Tooltip>

              <Popup
                // open={false}
                // isOpen={activePopup === cityName}
                // open={activePopup === cityName} // use open prop, not isOpen
                // onClose={() => {
                //   setActivePopup(null) // reset activePopup state when popup is closed
                // }}
                // ref={(ref) => {
                //   popupsRef.current[cityName] = ref
                // }}
              >
                <div style={{ cursor: 'pointer', textAlign: 'center' }}>
                  <strong>{cityName}</strong>
                  <div style={{ textAlign: 'start' }}>
                    {cityData?.companies.map((company, companyIndex) => (
                      <div
                        className={s.company_item}
                        key={companyIndex}
                        onClick={() => {
                          console.log(company.inn)
                        }}
                      >
                        {company.name}
                      </div>
                    ))}
                  </div>
                </div>
              </Popup>
            </Marker>
          )
        })}
    </MapContainer>
  )
}

export default Map
