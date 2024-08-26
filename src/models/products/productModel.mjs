import mongoose from "mongoose";
import { Schema } from "mongoose";


const Product = new Schema({
    image: {type: String, required: true, unique: true},
    title: {type: String, required: true, unique: true},
    rating: {type: Number, required: true},
    colorway: {type: String, required: true},
    brand: {type: String, required: true},
    model: {type: String, required: true},
    releaseDate: {type: String, required: false},
    department: {type: String, required: true},
    code: {type: String, required: true, unique: true}
})


const ProductModel = mongoose.model('ProductModel', Product)

export default ProductModel