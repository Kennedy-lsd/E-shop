import { Router } from "express";
import productController from "../controllers/productController.mjs";

const router = Router()


export default router.get('/api/products', productController)