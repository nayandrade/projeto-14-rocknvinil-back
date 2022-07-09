import { Router } from "express";
import { signUpController, signInController } from "../controllers/authControllers.js";
import { validateSignUp } from "../middlewares/validateSignUp.js";
import { validateSignIn } from "../middlewares/validateSignIn.js";

const router = Router();

router.post('/sign-up', validateSignUp, signUpController);
router.post('/sign-in', validateSignIn, signInController);

export default router;