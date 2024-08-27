import passport from "passport";
import dotenv from "dotenv";
import { Strategy } from "passport-google-oauth20";
import GoogleModel from "../models/auth/googleModel.mjs";

dotenv.config();

passport.serializeUser((user, done) => {
  console.log("Inside google serializer");

  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log("Inside google deserializer");
  try {
    const findUser = await GoogleModel.findById(id);
    return findUser ? done(null, findUser) : done(null, null);
  } catch (error) {
    done(error, null);
  }
});

export default passport.use(
  new Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8000/api/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);

      let findUser;
      try {
        findUser = await GoogleModel.findOne({
          email: profile["emails"][0].value
        });
      } catch (err) {
        return done(err, null);
      }
      try {
        if (!findUser) {
          const newUser = new GoogleModel({
            email: profile["emails"][0].value,
			username: profile["name"]["givenName"],
          });
          const newSavedUser = await newUser.save();
          return done(null, newSavedUser);
        }
        return done(null, findUser);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
