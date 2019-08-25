import { Middleware } from "koa";
import * as childProcess from "child_process";
import * as path from "path";

const upload: Middleware = async (ctx, next) => {
    const result = await new Promise((resolve, reject) => {
        const process = childProcess.exec(
            `python ${path.resolve(__dirname, "../../../engine/analyzer.py")}`,
            (err, stdout) => 
            err ? reject(err) : resolve(stdout));
        process.stdin.write(ctx.request.body);
        process.stdin.end();
    });

    ctx.response.body = result;
};

export default upload;