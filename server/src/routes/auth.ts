import { Router } from "express";
import { signUpController } from "../controllers/auth";
import { loginController } from "../controllers/auth";

const authRoutes: Router = Router();

authRoutes.post("/signup", signUpController);
authRoutes.post("/login", loginController);

export default authRoutes;
