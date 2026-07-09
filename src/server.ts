import express from 'express';
import {serverConfig } from './config';

import v1Router from './routers/V1/index.router';
import v2Router from './routers/V2/index.router';
import shortRouter from './routers/short.router';
import { genericErrorHandler } from './middlewares/error.middleware';
import logger from './config/logger.config';
import { attachCorrelationIdMiddleware } from './middlewares/correlation.middleware';

const app = express();

app.use(express.json());


app.use(attachCorrelationIdMiddleware);


// Short URL redirects (e.g. GET /s/:shortCode)
app.use('/s', shortRouter);

app.use('/api/v1', v1Router);
app.use('/api/v2', v2Router);

app.use(genericErrorHandler);

app.listen(serverConfig.PORT, ()=>{
    logger.info(`Server is running on http://localhost:${serverConfig.PORT}/api/v1/ping`);
    logger.info(`Sniplyx server started on port ${serverConfig.PORT}`);
    logger.info(`Press Ctrl +C to stop the server`,{"name":"dev servers"});

});