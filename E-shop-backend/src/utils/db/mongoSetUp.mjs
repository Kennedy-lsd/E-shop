import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const ConnectionToMongo = async () => {
  await mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Connected to Mongo"))
    .catch((err) => console.log(err));
};

process.on("SIGINT", async () => {
  console.log("SIGINT signal received: closing MongoDB connection");
  await mongoose.connection.close();
  process.exit(0);
});

export default ConnectionToMongo;
