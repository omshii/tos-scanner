import * as Koa from "koa";
import * as KoaStatic from "koa-static";
import * as pino from "pino";
import * as yargs from "yargs";
import * as path from "path";

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

// initialize server
const server = new Koa();

server.use(KoaStatic(path.resolve(__dirname, "../../client")))

server.listen(process.env.PORT || 3000);
logger.info("server started on port 3000");

if (options.dev)
    logger.info("development mode active");