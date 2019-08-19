import * as Koa from "koa";
import * as pino from "pino";

const logger = pino();
const server = new Koa();

// no middleware yet

server.listen(3000);
logger.info("server started on port 3000");