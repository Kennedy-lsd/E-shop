import mongoose from "mongoose";
import { Schema } from "mongoose";


const GoogleSchema = new Schema({
    email: {type: String, required: true},
    username: {type: String, required: true}
})

const GoogleModel = mongoose.model('GoogleModel', GoogleSchema)

export default GoogleModel