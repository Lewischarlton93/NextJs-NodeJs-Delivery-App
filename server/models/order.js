import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const Order = sequelize.define("Order", {
  items: {
    type: DataTypes.JSONB,
  },
  status: {
    type: DataTypes.STRING,
  },
});

export default Order;
