import { Router } from "express";
import {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
  getProductsByRating,
} from "../controllers/productController.mjs";
import { checkSchema } from "express-validator";
import { createProductValidation } from "../validationSchemas/productsValidationSchema.mjs";
import upload from "../utils/customMiddlewares/multer_config.mjs";
const router = Router();

router.get("/api/products", getProducts);

router.get("/api/products/:id", getProduct);

router.get("/api/products/rating/:rating", getProductsByRating);

router.post(
  "/api/products",
  upload,
  checkSchema(createProductValidation),
  createProduct
);

router.delete("/api/products/:id", deleteProduct);

router.patch("/api/products/:id", updateProduct);

export default router;
