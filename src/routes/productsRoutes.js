import { Router } from 'express';
import { getSuppliersProducts, getProductsForSupplier } from '../controllers/productsController.js';
import { validateSupplier } from '../middlewares/validateSupplier.js'
import { validateNewProduct } from "../middlewares/validateNewProduct.js";
import { newProductController } from "../controllers/productsController.js";

const router = Router();

router.get('/products', validateSupplier, getSuppliersProducts);
router.get('/products', getProductsForSupplier);
router.post('/new-product', validateNewProduct, newProductController);

export default router;