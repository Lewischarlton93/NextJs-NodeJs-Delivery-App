export default function Home() {
  return (
    <>
      <p>
        This project will tie together all Frontend/Backend. Fully responsive
        project on frontend with multiple API integrations. Maybe use Chakra UI
        for frontend? Consider Accesibility/Performance. Signup/Signin forms
        with Validators. JWT auth token / Refresh token.
      </p>
      <p>Deploy the application to AWS EC2 + Docker? Add relevant logs.</p>
      <p>
        Riders - We will want a way to sign up on the frontend which will post
        to the created endpoints. We should use the same signup form, but when
        they click on Sign up as rider, the account type will be set as Rider by
        default. (Same for Restaurant type if click Restaurant)
      </p>
      <p>
        Restaurant - We want a way for restaurants to sign up. We will use
        Google Places API to return autocomplete for restaurant searches on
        signup.
      </p>
      <p>
        Orders - We will want a way to create new orders. So you will need to be
        logged in as a Customer to create this. Restaurants can assign an order
        to a rider (They can't pick the rider, it will just assign it randomly
        based on rider within a certain radius). Use of WebSockets
        (WebSocket.io?) to give the rider real time 30 seconds to accept or
        decline the order. Use of Google Maps Directions API? to show distance
        between rider+restaurant + restaurant to customer + total distance.
        Display rough time based on transport type.
      </p>
    </>
  );
}
