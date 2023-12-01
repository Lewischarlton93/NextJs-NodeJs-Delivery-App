import GoOnline from '../../../src/Components/Rider/GoOnline'
import RiderHeader from '../../../src/Components/Rider/Header/RiderHeader'
import TodaysSummary from '../../../src/Components/Rider/Header/TodaysSummary'
import '../../../src/Theme/HideHeaderAndFooter.css'
import DirectionsMap from '../../../src/Components/Map/DirectionsMap'
import RiderBodyWrapper from '../../../src/Components/Rider/RiderBodyWrapper'

// TODO: Update this with actual values from DB.
const todaysSummarydata = [
  { title: '2', desc: 'Delivered' },
  { title: '£4', desc: 'Earned' },
  { title: '5', desc: 'Rejected' }
]

const StartRiding = () => {
  return (
    <>
      <RiderHeader />
      <TodaysSummary data={todaysSummarydata} />
      <RiderBodyWrapper>
        <DirectionsMap />
        <GoOnline />
      </RiderBodyWrapper>
    </>
  )
}

export default StartRiding
