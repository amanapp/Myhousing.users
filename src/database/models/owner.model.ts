import { Model, DataTypes } from 'sequelize';
import {sequelize} from '../dbconnection';

class Owner extends Model {}

Owner.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone_no: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
 
  verification_key: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  status: {
    type: DataTypes.BOOLEAN,
  }
}, {
  sequelize,
  modelName: 'owners',
  timestamps: true
});
Owner.sync({ alter: true});


export default Owner;
