import { Router } from "express";
import { validateProduct } from "../middlewares/validateProduct.js";
import { productController } from "../controllers/productController.js";

const router = Router()

router.post('/new-product', validateProduct, productController);

export default router;