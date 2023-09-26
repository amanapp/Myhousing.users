import { Model, DataTypes, UUIDV4 } from "sequelize";
import {sequelize} from '../dbconnection';
import { SessionAttributes } from '../../interface/global.interface';
import User from "./user.model";
import Owner from "./owner.model";


class Session extends Model<SessionAttributes> implements SessionAttributes {
  public id!: string;
  public userId!: string;
  public device!: string;
  public status!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Session.init(
  {
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
      },
    userId: {
      type: DataTypes.UUID,
      allowNull: false, 
    },
    device: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
   
  },
  {
    sequelize,
    tableName: 'sessions',
    timestamps:true
  },
);

Session.sync({ alter: true});

export default Session;
