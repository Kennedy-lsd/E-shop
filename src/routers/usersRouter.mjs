import { Router } from "express";
import {
  getUsers,
  updateUser,
  getUser,
  deleteUser,
} from "../controllers/userController.mjs";

const router = Router();

router.get("/api/users", getUsers);

router.get("/api/users/:id", getUser);

router.patch("/api/users/:id", updateUser);

router.delete("/api/users/:id", deleteUser);

export default router;
