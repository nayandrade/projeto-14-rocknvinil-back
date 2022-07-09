import { getSuppliersProducts } from '../controllers/productsController.js';
import { requireUser } from '../middlewares/validateUser.js'
import { getProductsForSupplier } from '../controllers/productsController.js';
import { Router } from 'express';
import { extractToken } from '../middlewares/extractUser.js';

const router = Router();

router.get('/myproducts', extractToken, requireUser, getSuppliersProducts);
router.get('/products', extractToken, getProductsForSupplier);

export default router;