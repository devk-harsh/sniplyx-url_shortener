import { Router } from "express";
import { shortenUrl } from "../../controllers/url.controller";
import { validateRequestBody } from "../../validators/index";
import { shortenUrlBodySchema } from "../../validators/url.validator";

const urlRouter = Router();

urlRouter.post("/shorten", validateRequestBody(shortenUrlBodySchema), shortenUrl);

export default urlRouter;
