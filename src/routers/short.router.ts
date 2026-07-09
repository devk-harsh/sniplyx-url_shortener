import { Router } from "express";
import { redirectHandler } from "../controllers/redirect.controller";

const shortRouter = Router();

shortRouter.get("/:shortCode", redirectHandler);

export default shortRouter;
