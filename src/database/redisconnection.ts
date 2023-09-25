import { createClient } from "redis";
import { loggers } from "../middleware/winston.middleware";

class RedisClient {
 public client:any;
  constructor() {
    this.client = createClient();
    this.client.on("error", (error:any) => loggers.info(`${process.env.REDIS_NOT_CONNECTION_MESSAGE}`));
  }

  async connect() {
    loggers.info(`${process.env.REDIS_CONNECTION_MESSAGE}`)
    await this.client.connect();
  }
  async setKey(key: any, value: any,option?:any) {
    await this.client.set(key, value,option);
  }
}

export const redisClient = new RedisClient();
redisClient.connect();