import dotenv from "dotenv";
import { StartApp } from "./StartApp.mjs";
import ConnectionToMongo from "./utils/db/mongoSetUp.mjs";

dotenv.config();

const app = StartApp();

ConnectionToMongo();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});
