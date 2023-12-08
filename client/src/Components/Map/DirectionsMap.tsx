'use client'
import React, { useState, useEffect } from 'react'
import { useJsApiLoader, GoogleMap, MarkerF, DirectionsRenderer } from '@react-google-maps/api'
import { styled, Button } from '@mui/material'
import LoadingSpinner from '../../UI/Loading/LoadingSpinner'
import NavigationIcon from '@mui/icons-material/Navigation'
import { useRiderStore } from '../../Stores/Rider/useRiderStore'
import { useRestaurantStore } from '../../Stores/Restaurant/useRestaurantStore'
import { useCustomerStore } from '../../Stores/Customer/useCustomerStore'

const DirectionsMapContainer = styled('div')(() => ({
  position: 'relative',
  '& .MuiFormControl-root': {
    width: '100%'
  }
}))

const GoogleMapContainer = styled('div')(() => ({
  width: '100%',
  height: '50vh',
  position: 'relative'
}))

const GoogleMapActions = styled('div')(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  width: '100%',
  padding: theme.spacing(4)
}))

// Currently set to crewe but map will always center to rider location when available
const centerMapPosition = { lat: 53.09787, lng: -2.44161 }
const libraries: ['places'] = ['places']

const DirectionsMap: React.FC = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || '',
    libraries
  })

  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(
    null
  )
  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null)
  const { riderLocationAddress, riderStep } = useRiderStore()
  const { restaurantAddress, restaurantLocationCoordinates } = useRestaurantStore()
  const { customerLocationCoordinates } = useCustomerStore()

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

  useEffect(() => {
    const fetchDirectionsData = async () => {
      if (isLoaded && google && riderLocationAddress && restaurantAddress) {
        const directionsService = new google.maps.DirectionsService()
        const results = await directionsService.route({
          origin: riderLocationAddress,
          destination: restaurantAddress,
          travelMode: 'BICYCLING' as google.maps.TravelMode
        })

        setDirectionsResponse(results)
      }
    }

    fetchDirectionsData()
  }, [isLoaded, riderLocationAddress, restaurantAddress])

  if (!isLoaded) {
    return <LoadingSpinner containerHeight="50vh" />
  }

  const openGoogleMaps = () => {
    if (riderLocationAddress && restaurantAddress) {
      // TODO: Change bicycling to travelMode from rider account settings
      const url = `https://www.google.com/maps/dir/?api=1&origin=${riderLocationAddress}&destination=${restaurantAddress}&travelmode=bicycling`
      window.open(url, '_blank')
    }
  }

  const handleMapLoad = (loadedMap: google.maps.Map) => {
    setMap(loadedMap)
  }

  const renderMarkers = () => {
    return [userLocation, restaurantLocationCoordinates, customerLocationCoordinates]
      .filter(Boolean)
      .map(
        (location, index) =>
          location && (
            <MarkerF
              key={index}
              position={location}
              title={
                index === 0
                  ? 'Rider Location'
                  : index === 1
                  ? 'Restaurant Location'
                  : 'Customer Location'
              }
            />
          )
      )
  }

  const renderMarkersOrDirections = () => {
    switch (riderStep) {
      case 'ORDER_RECEIVED':
        return <>{isLoaded && map && renderMarkers()}</>
      case 'ORDER_ACCEPTED':
        return <>{directionsResponse && <DirectionsRenderer directions={directionsResponse} />}</>
      default:
        return <></>
    }
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
            {renderMarkersOrDirections()}
          </GoogleMap>
        )}
        {riderStep === 'ORDER_ACCEPTED' && (
          <GoogleMapActions>
            <div className="google-map-actions__inner">
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
          </GoogleMapActions>
        )}
      </GoogleMapContainer>
    </DirectionsMapContainer>
  )
}

export default DirectionsMap
