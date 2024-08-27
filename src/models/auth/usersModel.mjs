import mongoose from "mongoose";
import { Schema } from "mongoose";


const UserSchema = new Schema({
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true},
    password: {type: String, required: true}
})

const UserModel = mongoose.model('UserModel', UserSchema)

export default UserModel