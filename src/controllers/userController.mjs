import {hashPassword} from "../utils/passwordHash.mjs/crypt.mjs";
import UserModel from "../models/auth/usersModel.mjs";
import { validationResult, matchedData } from "express-validator";

const getUsers = async (req, res) => {
	try{
	const findUsers = await UserModel.find()
	if (!findUsers) return res.sendStatus(404);
	return res.send(findUsers);
	}
	catch(error){
		res.status(500).json({message: error.message})
	}
};

const getUser = async (req, res) => {
	try {
		const { id } = req.params
		const findUser = await UserModel.findById(id)
		if (!findUser) {
			return res.status(404).json({message: "Not found"})
		}
		res.status(200).json(findUser)
	} catch (error) {
		res.status(500).json({message: error.message})
	}
	

}

const deleteUser = async (req, res) => {
	try {
		const { id } = req.params
		const deleteUser = await UserModel.findByIdAndDelete(id)
		if (!deleteUser) {
			return res.status(404).json({message: "Not found"})
		}
		res.sendStatus(200)
	} catch (error) {
		res.status(500).json({message: error.message})
	}
}


const updateUser = async (req, res) => {
	const result = validationResult(req)
	if (!result.isEmpty()) return res.status(400).send(result.array());
	const data = matchedData(req)
	try {
		const { id } = req.params
		data.password = await hashPassword(data.password);
		const updatedUser = await UserModel.findByIdAndUpdate(id, data, {new: true})
		if (!updatedUser) {
			return res.status(404).json({message: "Not found"})
		}
		res.status(200).json(updatedUser)
	} catch (error) {
		res.status(500).json({message: error.message})
	}
}

export {getUsers, getUser, deleteUser, updateUser}