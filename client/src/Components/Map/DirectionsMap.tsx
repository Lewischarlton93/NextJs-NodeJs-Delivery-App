'use client'
import React, { useRef, useState, useEffect } from 'react'
import {
  useJsApiLoader,
  GoogleMap,
  MarkerF,
  Autocomplete,
  DirectionsRenderer
} from '@react-google-maps/api'
import { styled, Button, TextField, Typography } from '@mui/material'
import { colors } from '../../Theme/Theme'
import LoadingSpinner from '../../UI/Loading/LoadingSpinner'
import NavigationIcon from '@mui/icons-material/Navigation'

// TODO: Pass in Rider Location, Restaurant Location & Customer Address. (Or get from Zustand global state instead?)
// Probably just do Current Location and Destination though as never need to do all 3 on the one map.
interface DirectionsMapProps {}

const DirectionsMapContainer = styled('div')(() => ({
  position: 'relative',
  '& .MuiFormControl-root': {
    width: '100%'
  }
}))

const GoogleMapContainer = styled('div')(() => ({
  width: '100%',
  height: '85vh'
}))

const GoogleMapActions = styled('div')(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  width: '100%',
  background: 'rgba(0, 0, 0, 0.6)',
  padding: theme.spacing(4),
  '& .google-map-metrics': {
    marginTop: theme.spacing(4),
    '&__distance-duration': {
      display: 'flex',
      '& p:first-of-type': {
        marginRight: theme.spacing(2)
      }
    }
  }
}))

// Currently set to crewe but map will always center to rider location when available
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
  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null)

  const restaurantLocation = {
    lat: 53.098293,
    lng: -2.4552962
  }

  const customerLocation = {
    lat: 53.111529,
    lng: -2.4332326
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        (error) => {
          console.error('Error getting current location:', error)
        }
      )
    } else {
      console.error('Geolocation is not supported by this browser.')
    }
  }, [])

  const originRef = useRef<HTMLInputElement>(null)
  const destinationRef = useRef<HTMLInputElement>(null)

  if (!isLoaded) {
    return <LoadingSpinner containerHeight="65vh" />
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

  function openGoogleMaps() {
    if (originRef.current?.value && destinationRef.current?.value) {
      // TODO: Change bicycling to travelMode from rider account settings
      const url = `https://www.google.com/maps/dir/?api=1&origin=${originRef.current.value}&destination=${destinationRef.current.value}&travelmode=bicycling`
      window.open(url, '_blank')
    }
  }

  const handleMapLoad = (loadedMap: google.maps.Map) => {
    setMap(loadedMap)
  }

  return (
    <DirectionsMapContainer>
      <GoogleMapContainer>
        {isLoaded && (
          <GoogleMap
            center={userLocation || centerMapPosition}
            zoom={15}
            mapContainerStyle={{ width: '100%', height: '100%' }}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false
            }}
            onLoad={handleMapLoad}
            onUnmount={() => setMap(null)}
            id="googleMapContainer"
          >
            {/* Marker didn't work with React 18+ so had to use MarkerF instead. Ref: https://github.com/JustFly1984/react-google-maps-api/issues/3048#issuecomment-1166410403*/}
            {isLoaded && map && userLocation && (
              <MarkerF position={userLocation} title="Rider Location" />
            )}
            {isLoaded && map && restaurantLocation && (
              <MarkerF position={restaurantLocation} title="Restaurant Location" />
            )}
            {isLoaded && map && customerLocation && (
              <MarkerF position={customerLocation} title="Customer Location" />
            )}

            {/* TODO: Check if riderStep === ORDER_ACCEPTED, and then show the directions. Likewise above, only show markers
            when riderStep is ORDER_RECEIVED. Maybe add switch case for these as well? */}
            {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
          </GoogleMap>
        )}
      </GoogleMapContainer>
      <GoogleMapActions>
        <div className="google-map-actions__inner">
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
            <Button
              onClick={openGoogleMaps}
              variant="outlined"
              sx={{
                borderRadius: '100%',
                height: 50,
                width: 50,
                position: 'absolute',
                bottom: (theme) => theme.spacing(4),
                right: (theme) => theme.spacing(4)
              }}
            >
              <NavigationIcon sx={{ width: 28, height: 28 }} />
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
