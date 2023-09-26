import express from "express";
import { config } from "dotenv";
import orderRoutes from "./routes/order-routes";

config();

const app = express();
const port = process.env.PORT || 3000;

app.use("/", orderRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
