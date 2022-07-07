import { Router } from "express";
import { addToCart, getCart, removeFromCart } from "../controllers/cartController.js";

const router = Router()

router.get('/carrinho', getCart)
router.post('/carrinho', addToCart)
router.delete('/carrinho', removeFromCart)

export default router;