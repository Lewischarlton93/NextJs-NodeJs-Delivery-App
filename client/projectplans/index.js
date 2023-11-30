export default function Home() {
  return (
    <>
      <p>
        This project will tie together all Frontend/Backend. Fully responsive project on frontend
        with multiple API integrations. Maybe use Chakra UI for frontend? Consider
        Accesibility/Performance. Signup/Signin forms with Validators. JWT auth token / Refresh
        token (Can take this from my Clickup project as a starting point and rework it to work with
        Sequelize). Will also want to include good test coverage with JEST + Cypress + Storybook.
      </p>

      <p>
        Can do a lot of the frontend first and just use json-server to mock the response back from
        some endpoints.
      </p>

      <p>
        Riders - We will want a way to sign up on the frontend which will post to the created
        endpoints. We should use the same signup form, but when they click on Sign up as rider, the
        account type will be set as Rider by default. (Same for Restaurant type if click
        Restaurant).
        <ul>
          <li>
            Once signed up, they can login, and select to put there status as online (p2: Show how
            long been online for, earnings by day etc..). If they are online, they will start to
            receive orders.
          </li>
          <li>
            Order will come through, it will display the following info: Amount you will get for the
            order, Total distance to travel + rough time estimate. Breakdown of Where to pick up the
            order from (resturant address), and customer Address. It will have a 'details' button
            which you can click into to show more info.
          </li>
          <li>
            There will be a google map taking up most of screen. It will show your location + final
            destination on it. To the bottom right, is a arrow symbol. If you click that, it will
            open up directions in google maps (new tab/app)
          </li>
          <li>
            If you accept the order, you will then be given an order number to collect from the
            restaurant. Once you are near the location of restaurant, the button which said "travel
            X miles to restaurant" will now change to "arrived". This will be clickable.
          </li>
          <li>Once clicked Arrived, it will then show a more detailed order summary.</li>
          <li>
            Once you have picked up the order from the restaurant, there will be another button
            'Collected Order'. which will change the status of the order to Out for delivery.
          </li>
          <li>
            Once clicked on this button, it will then take you back to the screen with the map on.
            Your location, customer location markers on the map. It will have customers address on
            this and button which says "Travel X mi to customer. Same as before, there will be an
            arrow to open this in google maps.
          </li>
          <li>
            Then same as before.. When you are near the location, the button will change to
            "arrived". Click this and you are then presented with a screen to Chat or Call the
            customer if they aren't answering. You then just select Delivery complete once done.
          </li>
        </ul>
        There is also a hamburger menu (floating on the map top left). Clicking this brings out a
        side menu. It shows Name, riderId. Then some links e.g. Earnings.
      </p>

      <p>
        Restaurant - We want a way for restaurants to sign up. We will use Google Places API to
        return autocomplete for restaurant searches on signup. Use Loqate or some sort of postcode
        service for Address search.
      </p>

      <p>
        Orders - We will want a way to create new orders. So you will need to be logged in as a
        Customer to create this. Restaurants can confirm an order. If confirmed, this will go to a
        rider (They can't pick the rider, it will just assign it randomly based on rider within a
        certain radius). Use of WebSockets (WebSocket.io?) to give the rider real time 30 seconds to
        accept or decline the order. Use of Google Maps Directions API? to show distance between
        rider+restaurant + restaurant to customer + total distance. Display rough time based on
        transport type.
      </p>

      <p>
        P2: Could go a step further with this and allow customers to first select the restaurant
        they want (They can filter by food type). They can browser through the items in the menu and
        add to basket to place order.
      </p>
      <p>
        P3: Payment Integrations.
        <p>Deploy the application to AWS EC2 + Docker? Add relevant logs.</p>.
      </p>
    </>
  )
}
