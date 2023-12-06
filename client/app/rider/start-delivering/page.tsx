'use client'
import GoOnline from '../../../src/Components/Rider/GoOnline'
import RiderHeader from '../../../src/Components/Rider/Header/RiderHeader'
import TodaysSummary from '../../../src/Components/Rider/Header/TodaysSummary'
import '../../../src/Theme/HideHeaderAndFooter.css'
import DirectionsMap from '../../../src/Components/Map/DirectionsMap'
import RiderBodyWrapper from '../../../src/Components/Rider/RiderBodyWrapper'
import { useRiderStore } from '../../../src/Stores/Rider/useRiderStore'
import { numberToString } from '../../../src/Utils/Utils'
import Rider from '../../../src/Components/Rider/Rider'

const StartRiding = () => {
  const { delivered, earned, rejected } = useRiderStore()

  const todaysSummarydata = [
    { title: numberToString(delivered), desc: 'Delivered' },
    { title: `£${numberToString(earned)}`, desc: 'Earned' },
    { title: numberToString(rejected), desc: 'Rejected' }
  ]

  return (
    <>
      <RiderHeader />
      <TodaysSummary data={todaysSummarydata} />
      {/* TODO: Since this is now a client component, can just add the RiderBodyWrapper as a styled div, or nest the TodaysSummary so this can be server component */}
      <RiderBodyWrapper>
        <Rider />
      </RiderBodyWrapper>
    </>
  )
}

export default StartRiding
