import * as KoaRouter from "koa-router";

import upload from "./upload";

const routes = new KoaRouter();

routes.post("upload", upload);

export default routes;
