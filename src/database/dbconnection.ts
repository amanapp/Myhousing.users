import { Sequelize } from "sequelize";
import { loggers } from "../middleware/winston.middleware";

class Database {
  private sequelize:any;
  constructor() {
    this.sequelize = new Sequelize('housing_db', 'postgres', 'postgres', {
      host: 'localhost',
      dialect: 'postgres'
    });
  }

  getSequelize() {
    loggers.info(`${process.env.DATABASE_CONNECTION_MESSAGE}`);
    return this.sequelize;
  }
}

const db = new Database();
export const sequelize = db.getSequelize();