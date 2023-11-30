'use client'
import React, { useRef, useState } from 'react'
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer
} from '@react-google-maps/api'
import { styled, Button, TextField, Typography } from '@mui/material'
import { dFlexSpaceBetween } from '../../Theme/UtilityStyles'
import { colors } from '../../Theme/Theme'

// TODO: Pass in Rider Location, Restaurant Location & Customer Address.
// Probably just do Current Location and Destination though as never need to do all 3 on the one map.
interface DirectionsMapProps {}

const DirectionsMapContainer = styled('div')(({}) => ({
  position: 'relative',
  '& .MuiFormControl-root': {
    width: '100%'
  }
}))

const GoogleMapContainer = styled('div')(({}) => ({
  width: '100%',
  height: '85vh'
}))

const GoogleMapActions = styled('div')(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  width: '100%',
  background: 'rgba(0, 0, 0, 0.6)',
  padding: theme.spacing(4),
  '& .google-map-actions': {
    //display: 'flex'
  },
  '& .google-map-metrics': {
    marginTop: theme.spacing(4),
    '&__distance-duration': {
      ...dFlexSpaceBetween
    }
  }
}))

// TODO: Currently set to crewe but need to look at centering based on rider location
const centerMapPosition = { lat: 53.09787, lng: -2.44161 }
const libraries: ['places'] = ['places']

const DirectionsMap: React.FC<DirectionsMapProps> = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || '',
    libraries
  })

  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(
    null
  )
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')
  // const mapZoom = 15

  const originRef = useRef<HTMLInputElement>(null)
  const destinationRef = useRef<HTMLInputElement>(null)

  if (!isLoaded) {
    return <p>Loading Map</p>
  }

  async function calculateRoute() {
    if (!originRef.current?.value || !destinationRef.current?.value) {
      return
    }

    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      // TODO: Change travelMode to come from rider account settings
      travelMode: google.maps.TravelMode.BICYCLING
    })

    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance?.text || '')
    setDuration(results.routes[0].legs[0].duration?.text || '')
  }

  function clearRoute() {
    setDirectionsResponse(null)
    setDistance('')
    setDuration('')
    if (originRef.current) originRef.current.value = ''
    if (destinationRef.current) destinationRef.current.value = ''
  }

  return (
    <DirectionsMapContainer>
      <GoogleMapContainer>
        <GoogleMap
          center={centerMapPosition}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false
          }}
          onLoad={(map) => setMap(map as google.maps.Map)}
          onUnmount={() => setMap(null)}
        >
          {isLoaded && map && <Marker position={centerMapPosition} />}
          {isLoaded && directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
        </GoogleMap>
      </GoogleMapContainer>
      <GoogleMapActions>
        <div className="google-map-actions">
          {/* TODO: Have added inputs here for now (for testing) but the values will just be replaced with store/rider locations */}
          <Autocomplete>
            <TextField type="text" placeholder="Origin" inputRef={originRef} />
          </Autocomplete>
          <Autocomplete>
            <TextField
              type="text"
              placeholder="Destination"
              inputRef={destinationRef}
              variant="outlined"
            />
          </Autocomplete>
          <div className="google-map-actions__buttons">
            <Button
              type="submit"
              onClick={calculateRoute}
              sx={{ mr: (theme) => theme.spacing(2) }}
              variant="contained"
            >
              Calculate Route
            </Button>
            <Button onClick={clearRoute} variant="text">
              Clear Route
            </Button>
          </div>
        </div>
        <div className="google-map-metrics">
          <div className="google-map-metrics__distance-duration">
            <Typography variant="body1" sx={{ color: colors.white }}>
              Distance: {distance}
            </Typography>
            <Typography variant="body1" sx={{ color: colors.white }}>
              Duration: {duration}
            </Typography>
          </div>
          {/* <div
            onClick={() => {
              if (map) {
                map.panTo(center)
                map.setZoom(mapZoom + 1)
              }
            }}
          >
            Zoom In
          </div>
          <div
            onClick={() => {
              if (map) {
                map.panTo(center)
                map.setZoom(mapZoom - 1)
              }
            }}
          >
            Zoom Out
          </div> */}
        </div>
      </GoogleMapActions>
    </DirectionsMapContainer>
  )
}

export default DirectionsMap
