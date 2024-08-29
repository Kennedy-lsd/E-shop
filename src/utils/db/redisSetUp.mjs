import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

const REDIS_URL = process.env.REDIS_URL;

const redisClient = createClient({
  url: REDIS_URL,
});

const ConnectionToRedis = async () => {
  await redisClient
  .connect()
  .then(() => {
    console.log("Connected to Redis");
  })
  .catch((error) => {
    console.error("Could not connect to Redis:", error);
  });
}

export {redisClient, ConnectionToRedis};
