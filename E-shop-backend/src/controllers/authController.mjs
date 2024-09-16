import UserModel from "../models/auth/usersModel.mjs";
import {
  hashPassword,
  comparePassword,
} from "../utils/passwordHash.mjs/crypt.mjs";
import { matchedData, validationResult } from "express-validator";
import jwt from "jsonwebtoken";

const getStatus = async (req, res) => {
  return req.user
    ? res.status(200).send(req.user)
    : res.status(401).send("Not authorized");
};

const registerUser = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty())
    return res.status(400).json({ result: result.array() });

  const data = matchedData(req);

  console.log("Matched data:", data);
  try {
    const existingUser = await UserModel.findOne({ email: data.email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    data.password = await hashPassword(data.password);

    await UserModel.create(data);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const authenticateUser = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ error: "Invalid Email" });
    }

    const { username, _id, password } = user;

    if (!comparePassword(req.body.password, password)) {
      return res.status(401).json({ error: "Invalid Username or Password" });
    }

    if (req.body.username !== username) {
      return res.status(401).json({ error: "Invalid Username or Password" });
    }

    // Generate JWT token 
    const token = jwt.sign({ email: user.email }, "secret")

    return res.status(200).json({ token, username, _id });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


const getUser = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.user.email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ username: user.username, email: user.email });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { authenticateUser, registerUser, getUser, getStatus };
