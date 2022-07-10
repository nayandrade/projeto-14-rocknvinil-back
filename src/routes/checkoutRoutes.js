import { Router } from "express";
import { getProducts, addTransaction } from "../controllers/checkoutControllers.js";
import { validateOnlineUser } from "../middlewares/validateOnlineUser.js";

const router = Router()

router.get('/checkout', validateOnlineUser, getProducts)
router.post('/checkout', validateOnlineUser, addTransaction)

export default router;