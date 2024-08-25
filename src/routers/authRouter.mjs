import passport from "passport";
import { Router } from "express";
import { getStatus, logOut } from "../controllers/authController.mjs";
const router = Router();

router.post(
  "/api/auth",
  passport.authenticate("local"),
  (request, response) => {
    response.sendStatus(200);
  }
);

router.get("/api/auth/status", getStatus);

router.post("/api/auth/logout", logOut);

export default router