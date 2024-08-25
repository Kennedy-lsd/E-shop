import mongoose from "mongoose";
import { Schema } from "mongoose";


const UserSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

const UserModel = mongoose.model('UserModel', UserSchema)

export default UserModel