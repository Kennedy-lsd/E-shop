import ProductModel from "../models/products/ProductModel.mjs";
import { validationResult } from "express-validator";
import mongoose from "mongoose";
import redisClient from "../utils/db/redisSetUp.mjs";

const getProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();
    if (products.length === 0) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductsByRating = async (req, res) => {
  try {
    const { rating } = req.params;
    const parsedRating = parseFloat(rating);
    if (isNaN(parsedRating)) {
      return res.status(400).json({ message: "Invalid rating value" });
    }

    const findProducts = await ProductModel.find({ rating: parsedRating });
    if (!findProducts) {
      res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(findProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the product ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const cacheKey = `product:${id}`;
    // Check if the product data is in Redis
    const cachedProduct = await redisClient.get(cacheKey);

    if (cachedProduct) {
      return res.status(200).json(JSON.parse(cachedProduct));
    }

    const product = await ProductModel.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Not found" });
    }

    // Store the product in Redis with a TTL of 3600 seconds
    await redisClient.setEx(cacheKey, 3600, JSON.stringify(product));

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) return res.status(400).send(result.array());
  try {
    const product = await ProductModel.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProduct = await ProductModel.findByIdAndDelete(id);
    if (!deleteProduct) {
      return res.status(404).json({ message: "Not found" });
    }
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await ProductModel.findByIdAndUpdate(id, req.body);
    if (!updatedProduct) {
      return res.status(404).json({ message: "Not found" });
    }
    const product = await ProductModel.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
  getProductsByRating,
};
