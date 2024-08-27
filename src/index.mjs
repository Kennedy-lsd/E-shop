import express from "express";
import { json } from "express";
import mongoose from "mongoose";
import REQUEST_VIEWER from "./utils/customMiddlewares/request_viewer.mjs";
import productRouter from "./routers/productRouter.mjs";
import GoogleAuthRouter from "./routers/googleAuthRouter.mjs";
import passport from "passport";
import cookieParser from "cookie-parser";
import authRouter from "./routers/authRouter.mjs";
import session from "express-session";
import usersRouter from "./routers/usersRouter.mjs";
import dotenv from "dotenv";
import cors from "cors";
import MongoStore from "connect-mongo";
import "./authStrategy/google.mjs";

const app = express();

dotenv.config();



//Middlewares
app.use(json());
app.use(REQUEST_VIEWER);
app.use(cors());
app.use(
  session({
    secret: "dev",
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 6000 * 60 },
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use(productRouter);
app.use(authRouter);
app.use(usersRouter);
app.use(GoogleAuthRouter);

app.get("/", (req, res) => {
  res.status(200).send("hello");
});

const PORT = process.env.PORT || 3000;

mongoose
  .connect(
    process.env.MONGO_URL
  )
  .then(() => console.log("Connected"))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});
