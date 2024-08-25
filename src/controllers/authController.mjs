import pass from "../authStrategy/local.mjs";
import passport from "passport";
import UserModel from "../models/auth/usersModel.mjs";

passport.serializeUser((user, done) => {
  console.log("Inside serializer");
  
  done(null, user.id)
})


passport.deserializeUser(async (id, done) => {    
  try {
      console.log(`Inside desirealizer with ${id} id`);

      const findUser = await UserModel.findById(id)
      if (!findUser) throw new Error("User not found")
      done(null, findUser)
  } catch (error) {
      done(error, null)
  }
})

const getStatus = async (req, res) => {
  return req.user
    ? res.status(200).send(req.user)
    : res.status(401).send("Not authorized");
};

const logOut = async (req, res) => {
  if (!request.user) return response.sendStatus(401);
  request.logout((err) => {
    if (err) return response.sendStatus(400);
    response.send(200);
  });
};

export { getStatus, logOut };
