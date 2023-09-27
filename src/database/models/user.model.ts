import { Model, DataTypes, UUIDV4 } from "sequelize";
import { sequelize } from "../dbconnection";

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_no: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    wishlist_id: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: true,
    },
    visit_count: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: true,
    },
    subscription_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'subscriptions',
        key: 'id'
      }
    },
    subscription_start: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    subscription_end: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    verification_key: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "users",
    timestamps: true,
  }
);
User.sync({ alter: true });

export default User;
