// TODO: This is a temporary solution for frontend until backend is done!
// We will want to get the customerId from req.header? and add to order...
// restaurantId should already be from the restaurant they have selected.
// riderId at the initial post should be null? and then assigned seperately?
// Look at MUI Snackbar for success message?
'use client'
import { Typography, Button } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

// TODO: Revisit this when doing the customer side of it. As really we just want to use this to post the items to create the order.
const CreateOrder = () => {
  const queryClient = useQueryClient()

  const { mutate: submitOrder, isPending } = useMutation({
    // TODO: Add some post data!
    mutationFn: async () => await axios.post('/orders', {}),
    onSuccess: () => {
      // @ts-ignore
      queryClient.invalidateQueries(['allOrders'])
      // If getting the value from a form, we would also update all values back to ''
      console.log('Order created succesfully')
    },
    onError: (err) => {
      // TODO: This will currently fail since endpoint is wrong!
      console.log(`${err} - Something went wrong creating the order!`)
    }
  })

  if (isPending) {
    return <p>Loading... (Maybe do a loading spinner on the button?, pass in isLoading prop?)</p>
  }

  return (
    <>
      <Typography variant="body1" sx={{ fontSize: 12 }}>
        This is here temporary until backend/customer part is done!
      </Typography>
      <form>
        <Button onClick={() => submitOrder()} disabled={isPending}>
          Create Order
        </Button>
      </form>
    </>
  )
}

export default CreateOrder
