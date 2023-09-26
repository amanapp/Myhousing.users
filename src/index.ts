import express, { Express, Router } from "express";
import "./config/env";
import { loggers } from "./middleware/winston.middleware";
import { AuthRouter } from "./routes/auth.route";
import { redisClient } from "./database/redisconnection";
import { sequelize } from "./database/dbconnection";

class App {
  private app!: Express;
  private port!: string | unknown;

  constructor() {
    this.startApp();
  }

  private startApp() {
    this.app = express();
    this.port = <string>(process.env.PORT || process.env.INSTANT_PORT);
    this.loadGlobalMiddleware();
    /**sequelize connection */
    sequelize;
    /**redis client connection */
    redisClient;
    /**routers*/
    this.localRoute();
    /**server start */
    this.startServer();
  }
  private loadGlobalMiddleware() {
    this.app.use(express.json());
  }
  /**local route declare */
  private localRoute() {
    this.app.use(AuthRouter.loadRoute());
  }
  private startServer() {
    this.app.listen(this.port, this.callback);
  }
  private callback = () => {
    loggers.info(`server is started on this port ${this.port}`);
  };
}
new App();
