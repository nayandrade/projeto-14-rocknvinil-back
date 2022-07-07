import { Router } from "express";
import { getCart, addToCart, removeFromCart, editCart } from "../controllers/cartControllers.js";

const router = Router()

router.get('/carrinho', getCart)
router.post('/carrinho', addToCart)
router.delete('/carrinho/:id', removeFromCart)
router.put('/carrinho/:id', editCart)

export default router;