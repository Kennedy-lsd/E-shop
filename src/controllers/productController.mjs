import ProductModel from "../models/products/ProductModel.mjs";
import { validationResult } from "express-validator";

const getProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();
    if (!products) {
      res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Not found" });
    }
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
		const { id } = req.params
		const deleteProduct = await ProductModel.findByIdAndDelete(id)
		if (!deleteProduct) {
			return res.status(404).json({message: "Not found"})
		}
		res.sendStatus(200)
	} catch (error) {
		res.status(500).json({message: error.message})
	}
}


const updateProduct = async (req, res) => {
  try {
    const { id } = req.params
    const updatedProduct = await ProductModel.findByIdAndUpdate(id, req.body)
    if (!updatedProduct) {
      return res.status(404).json({message: "Not found"})

    }
    const product = await ProductModel.findById(id);
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

export { getProducts, getProduct, createProduct, deleteProduct, updateProduct };
