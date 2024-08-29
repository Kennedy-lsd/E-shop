import dotenv from "dotenv";
import { StartApp } from "./StartApp.mjs";
import ConnectionToMongo from "./utils/db/mongoSetUp.mjs";
import {ConnectionToRedis} from "./utils/db/redisSetUp.mjs";

dotenv.config();

const app = StartApp();

ConnectionToRedis();
ConnectionToMongo();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});
