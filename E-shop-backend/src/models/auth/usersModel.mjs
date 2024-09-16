import mongoose from "mongoose";
import { Schema } from "mongoose";


const UserSchema = new Schema({
    email: {type: String, required: true, unique: true, index: true},
    username: {type: String, required: true, unique: true, index: true},
    password: {type: String, required: true}
})

UserSchema.index({email: 1, username: 1})

const UserModel = mongoose.model('UserModel', UserSchema)

export default UserModel