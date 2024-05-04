import { Router } from "express";
import { meController, signUpController } from "../controllers/auth";
import { loginController } from "../controllers/auth";
import { errorHandler } from "../error-handler";
import authMiddleware from "../middlewares/auth";

const authRoutes: Router = Router();

authRoutes.post("/signup", errorHandler(signUpController));
authRoutes.post("/login", errorHandler(loginController));
authRoutes.get("/me", [authMiddleware], errorHandler(meController));

export default authRoutes;
