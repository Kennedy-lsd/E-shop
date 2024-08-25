import passport from "passport";
import Strategy from "passport-local";
import UserModel from "../models/auth/usersModel.mjs";
import { comparePassword } from "../utils/passwordHash.mjs/crypt.mjs";


const pass = passport.use(
    new Strategy(async (username, password, done) => {
        console.log(username);
        console.log(password);
        try {
            const findUser = await UserModel.findOne({ username })
            if (!findUser) throw new Error("user not found")
            if (!comparePassword(password, findUser.password)) throw new Error("inccorect password")
            done(null, findUser)
        } catch (error) {
            done(error, null)
        }
    })
)

export default pass