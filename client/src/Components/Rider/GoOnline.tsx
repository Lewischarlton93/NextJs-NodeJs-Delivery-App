'use client'
import Button from '@mui/material/Button'
import { useRouter } from 'next/navigation'

const GoOnline = () => {
  const router = useRouter()

  const handleUpdateOnlineStatus = () => {
    // TODO: POST REQ to update rider online status in Rider table.
    console.log('Online!')
    router.push('/rider/awaiting-order')
  }

  return <Button onClick={handleUpdateOnlineStatus}>Go Online</Button>
}

export default GoOnline
