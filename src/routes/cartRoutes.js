import { Router } from "express";
import { getCart, addToCart, removeFromCart, editCart } from "../controllers/cartControllers.js";
import { validateOnlineUser } from "../middlewares/validateOnlineUser.js";

const router = Router()

router.get('/cart', validateOnlineUser, getCart)
router.post('/cart', validateOnlineUser, addToCart)
router.delete('/cart/:id', validateOnlineUser, removeFromCart)
router.put('/cart/:id', validateOnlineUser, editCart)

export default router;