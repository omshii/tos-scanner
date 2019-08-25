import Router from "koa-router";

import upload from "./upload";

const routes = new Router();

routes.post("upload", upload);

export default routes;
