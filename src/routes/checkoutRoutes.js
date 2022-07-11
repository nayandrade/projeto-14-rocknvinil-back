import { Router } from "express";
import { addTransaction } from "../controllers/checkoutControllers.js";
import { validateOnlineUser } from "../middlewares/validateOnlineUser.js";
import { validateCheckout } from "../middlewares/validateCheckout.js";


const router = Router()

router.post('/checkout', validateOnlineUser, validateCheckout, addTransaction)

export default router;