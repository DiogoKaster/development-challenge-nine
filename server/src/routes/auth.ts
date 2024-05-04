import { Router } from "express";
import { signUpController } from "../controllers/auth";
import { loginController } from "../controllers/auth";
import { errorHandler } from "../error-handler";

const authRoutes: Router = Router();

authRoutes.post("/signup", errorHandler(signUpController));
authRoutes.post("/login", errorHandler(loginController));

export default authRoutes;
