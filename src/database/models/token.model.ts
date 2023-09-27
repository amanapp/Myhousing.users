import { Model, DataTypes, UUIDV4 } from "sequelize";
import { sequelize } from "../dbconnection";
import User from "./user.model";

export class Token extends Model {}
Token.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    userId: {
      type:  DataTypes.UUID,
      allowNull: false,
     
    },
    refreshToken: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    accessToken: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "tokens",
    timestamps: true,
  }
);

Token.sync({ alter: true});

export default Token;
