import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Restaurant extends Model {}

Restaurant.init(
  {
    // Id (primary key) will be auto-generated
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      // I see this as being an array with 2 values for Lat and Long e.g. ['435435435', '-e4535435435']
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Restaurant",
    timestamps: false,
    underscored: true, // Use snake_case for column names
    tableName: "restaurants", // Define the table name if different from the model name
    autoIncrement: true, // Enable auto-increment for the primary key
    primaryKey: true, // Set the primary key
  }
);

export default Restaurant;
