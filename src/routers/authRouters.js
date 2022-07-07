import express from "express";
import { signUpController } from "../controllers/authControllers.js";
import { validateSignUp } from "../middlewares/validateSignUp.js";

const authRouter = express.Router();
authRouter.post('/sign-up', validateSignUp, signUpController);

export default authRouter;