import { Router } from "express";
import { errorHandler } from "../error-handler";
import {
  createPacient,
  deletePacient,
  getPacientById,
  listPacients,
  updatePacient,
} from "../controllers/pacients";
import authMiddleware from "../middlewares/auth";

const pacientRoutes: Router = Router();

pacientRoutes.get("/", [authMiddleware], errorHandler(listPacients));
pacientRoutes.post("/create", [authMiddleware], errorHandler(createPacient));
pacientRoutes.put("/update/:id", [authMiddleware], errorHandler(updatePacient));
pacientRoutes.delete("/:id", [authMiddleware], errorHandler(deletePacient));
pacientRoutes.get("/:id", [authMiddleware], errorHandler(getPacientById));

export default pacientRoutes;
