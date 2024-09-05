import {hashPassword} from "../utils/passwordHash.mjs/crypt.mjs";
import UserModel from "../models/auth/usersModel.mjs";
import { validationResult, matchedData } from "express-validator";
import mongoose from "mongoose";
import {redisClient} from "../utils/db/redisSetUp.mjs";

const getUsers = async (req, res) => {
	try {
	const findUsers = await UserModel.find()
	if (findUsers.length === 0) {
		return res.status(404).json({ message: 'No users found' });
	}
	res.status(200).json(findUsers)
	}
	catch(error){
		res.status(500).json({message: error.message})
	}
};

const getUser = async (req, res) => {
	try {
		const { id } = req.params
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(400).json({ message: "Invalid product ID" });
		  }

		const cacheKey = `user:${id}`

		const cachedUser = await redisClient.get(cacheKey)

		if (cachedUser) {
			return res.status(200).json(JSON.parse(cachedUser))
		}

		const findUser = await UserModel.findById(id)
		if (!findUser) {
			return res.status(404).json({message: "Not found"})
		}

		await redisClient.setEx(cacheKey, 3600, JSON.stringify(findUser))

		res.status(200).json(findUser)
	} catch (error) {
		res.status(500).json({message: error.message})
	}
	

}

const deleteUser = async (req, res) => {
	try {
		const { id } = req.params
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(400).json({ message: "Invalid product ID" });
		  }
		const deleteUser = await UserModel.findByIdAndDelete(id)
		if (!deleteUser) {
			return res.status(404).json({message: "Not found"})
		}
		res.status(200).json({message: "User was deleted"})
	} catch (error) {
		res.status(500).json({message: error.message})
	}
}


const updateUser = async (req, res) => {
	try {
		const { id } = req.params
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(400).json({ message: "Invalid product ID" });
		  }
		const User = await UserModel.findByIdAndUpdate(id, req.body)
		if (!User) {
			return res.status(404).json({message: "Not found"})
		}
		const updatedUser = await UserModel.findById(id)
		res.status(200).json(updatedUser)
	} catch (error) {
		res.status(500).json({message: error.message})
	}
}

export {getUsers, getUser, deleteUser, updateUser}