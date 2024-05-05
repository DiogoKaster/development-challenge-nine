import { Router } from "express";
import authRoutes from "./auth";
import pacientRoutes from "./pacients";

const rootRouter: Router = Router();

rootRouter.use("/auth", authRoutes);
rootRouter.use("/pacients", pacientRoutes);

export default rootRouter;
