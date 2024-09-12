import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

const REDIS_URL = process.env.REDIS_URL;
const MAX_RETRIES = 2;  
const RETRY_DELAY = 3000;  

const redisClient = createClient({
  url: REDIS_URL,
});

redisClient.once("error", (err) => {
  console.error("Redis client error:", err)
});

const ConnectionToRedis = async (retries = 0) => {
  try {
    await redisClient.connect();
    console.log("Connected to Redis");

    const handleExit = async () => {
      try {
        await redisClient.disconnect();
        console.log("Redis connection closed");
        process.exit(0);
      } catch (error) {
        console.error("Error while disconnecting from Redis:", error);
        process.exit(1);
      }
    };

    process.on("SIGINT", handleExit);
    process.on("SIGTERM", handleExit);
    process.on("exit", handleExit);  

  } catch (error) {
    console.error(`Could not connect to Redis (attempt ${retries + 1}):`, error);

    if (retries < MAX_RETRIES) {
      console.log(`Retrying in ${RETRY_DELAY / 1000} seconds...`);
      setTimeout(() => ConnectionToRedis(retries + 1), RETRY_DELAY);
    } else {
      console.error("Max retries reached. Could not connect to Redis.");
    }
  }
};

export { redisClient, ConnectionToRedis };
