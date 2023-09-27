import express from "express";
import { config } from "dotenv";
import orderRoutes from "./routes/order-routes";
import restaurantRoutes from "./routes/restaurant-routes";
import riderRoutes from "./routes/rider-routes";

config();

const app = express();
const port = process.env.PORT || 3000;

// Routes
app.use("/", orderRoutes);
app.use("/", restaurantRoutes);
app.use("/", riderRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
