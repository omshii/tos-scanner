import { Middleware } from "koa";
import * as childProcess from "child_process";
import * as path from "path";

const upload: Middleware = async (ctx, next) => {
    ctx.response.body = await new Promise((resolve) => {
        const process = childProcess.exec(
            `python ${path.resolve(__dirname, "../../../engine/analysis.py")}`,
            (err, stdout) => resolve(stdout));
        process.stdin.write(ctx.body);
        process.stdin.end();
    });
};

export default upload;