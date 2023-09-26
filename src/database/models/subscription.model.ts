import { Model, DataTypes, UUIDV4 } from "sequelize";
import { sequelize } from '../dbconnection';

class Subscription extends Model {
  public id!: string;
  public amount!: number;
  public name!: string;
  public offers!: string;
}

Subscription.init(
  {
    id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
      },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    offers: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'subscriptions',
    timestamps: true,
  }
);
Subscription.sync({alter:true})
export default Subscription;
