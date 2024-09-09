import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const ConnectionToMongo = async () => {
  await mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Connected to Mongo"))
    .catch((err) => console.log(err));
};

export default ConnectionToMongo;
