import express from "express";
import { json } from "express";
import REQUEST_VIEWER from "./utils/customMiddlewares/request_viewer.mjs";
import productRouter from "./routers/productRouter.mjs";
import GoogleAuthRouter from "./routers/googleAuthRouter.mjs";
import passport from "passport";
import authRouter from "./routers/authRouter.mjs";
import session from "express-session";
import usersRouter from "./routers/usersRouter.mjs";
import cors from "cors";
import MongoStore from "connect-mongo";
import "./authStrategy/google.mjs";

export function StartApp() {
  const app = express();

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

  return app;
}
