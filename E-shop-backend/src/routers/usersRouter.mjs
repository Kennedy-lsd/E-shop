import { Router } from "express";
import {
  getUsers,
  createUser,
  updateUser,
  getUser,
  deleteUser,
} from "../controllers/userController.mjs";
import { checkSchema } from "express-validator";
import { createUserValidationSchema } from "../validationSchemas/usersValidatorSchema.mjs";


const router = Router();

router.get("/api/users", getUsers);

router.get("/api/users/:id", getUser);

router.post("/api/users" , checkSchema(createUserValidationSchema), createUser)

router.patch("/api/users/:id", updateUser);

router.delete("/api/users/:id", deleteUser);

export default router;
