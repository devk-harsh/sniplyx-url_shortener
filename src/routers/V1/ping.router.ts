import express, { Request, Response, NextFunction } from 'express';

import { pingHandler } from '../../controllers/ping.controller';

import {validateQueryParams, validateRequestBody} from '../../validators/index'
import { pingBodySchema, pingQuerySchema } from '../../validators/ping.validator';

const pingRouter = express.Router();

pingRouter.get('/', validateRequestBody(pingBodySchema), validateQueryParams(pingQuerySchema),pingHandler);

pingRouter.post('/', validateRequestBody(pingBodySchema), validateQueryParams(pingQuerySchema),pingHandler);

export default pingRouter;