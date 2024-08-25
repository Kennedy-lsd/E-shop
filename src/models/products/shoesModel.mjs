import mongoose from "mongoose";
import { Schema } from "mongoose";


const Shoes = new Schema({
    image: {type: String, required: true},
    title: {type: String, required: true},
    rating: {type: Number, required: true},
    colorway: {type: String, required: true},
    brand: {type: String, required: true},
    model: {type: String, required: true},
    releaseDate: {type: String, required: false},
    department: {type: String, required: true},
    code: {type: String, required: true}
})


const ShoesModel = mongoose.model('ShoesModel', Shoes)

export default ShoesModel