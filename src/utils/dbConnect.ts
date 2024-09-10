import mongoose from "mongoose";
import config from "config";
import logger from "./logger";

const DB_ENDPOINT = config.get<string>("dbUri");

const dbInstance = (function database() {
  let instance: typeof mongoose;

  async function connect() {
    const db = await mongoose.connect(DB_ENDPOINT);
    logger.info("Connected to DB.")

    return db;
  }

  async function getInstance() {
    if (instance) return instance;
    logger.info("No instance, creating db connection.")

    instance = await connect();
    return instance;
  }

  return getInstance;
})();

export default dbInstance;