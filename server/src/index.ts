import * as Koa from "koa";
import * as KoaStatic from "koa-static";
import * as KoaRouter from "koa-router";
import * as KoaBodyParser from "koa-bodyparser";

import * as pino from "pino";
import * as yargs from "yargs";
import * as path from "path";
import { performance } from "perf_hooks";
import api from "./api/index";

// get command line options
const options = yargs
    .option("dev", {
        alias: "development",
        type: "boolean",
        default: process.env.NODE_ENV === "development",
        describe: "Whether to run the server in development mode. If the NODE_ENV environment variable " +
            "is set to 'development', this defaults to true."
    })
    .argv;

// set up logging
const logger = pino();

if (options.dev) {
    logger.info("development mode active");
    logger.level = "trace"; // enable more verbose logging
}

// initialize server
const server = new Koa();
const router = new KoaRouter();

// logging
server.use(async (ctx, next) => {
    try {
        const start = performance.now();
        await next();
        const end = performance.now();
        logger.trace(`request: ${ctx.method} ${ctx.path} ${ctx.status} ${end - start}ms`);
    } catch (error) {
        logger.error(`request: ${ctx.method} ${ctx.path}`, { error });
    }
});

// initialize body parsing
server.use(KoaBodyParser({ enableTypes: ["text"] }));

// initialize routing
router.use("/api", api.routes());
server.use(router.routes());

// initalize static serving
const staticPath = path.resolve(__dirname, "../../client/dist");
server.use(KoaStatic(staticPath));

logger.debug(`serving from ${staticPath}`);

server.listen(process.env.PORT || 3000);
logger.info("server started on port 3000");