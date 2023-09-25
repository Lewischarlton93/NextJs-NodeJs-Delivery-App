import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const Restaurant = sequelize.define("Restaurant", {
  name: {
    type: DataTypes.STRING,
  },
});

export default Restaurant;
