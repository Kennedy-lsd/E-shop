import "../authStrategy/google.mjs"
import passport from "passport";
import { Router } from "express";

const router = Router();


router.get("/api/auth/google", passport.authenticate("google", { scope: ['profile', 'email'] }))

router.get(
  "/api/auth/google/callback",
  passport.authenticate("google"), (req, res) => {
    console.log(req.session)
    console.log(req.user)
    res.sendStatus(200)
  }
);


export default router