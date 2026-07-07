import express from "express";
import pingRouter from "./ping.router";
import healthRouter from "./health.router";
import urlRouter from "./url.router";

const v1Router = express.Router();

v1Router.use('/ping', pingRouter);
v1Router.use('/urls', urlRouter);
v1Router.use("/", healthRouter);

export default v1Router;