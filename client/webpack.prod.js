const merge = require("webpack-merge");
const { default: common, revision } = require("./webpack.common");
const { DefinePlugin } = require("webpack");
const { join } = require("path");

const CompressionPlugin = require("compression-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const SentryCliPlugin = require("@sentry/webpack-plugin");

exports.default = merge(common, {
    plugins: [
        new DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("production")
        }),
        // minify css
        new MiniCssExtractPlugin({
            filename: "[name].[hash].css",
            chunkFilename: "[id].[hash].css",
        }),
        // gzip everything
        new CompressionPlugin({
            filename: "[path].gz[query]",
            test: /\.js$|\.css$/,
            threshold: 10240,
            minRatio: 0.8
        }),
        new SentryCliPlugin({
            release: revision,
            include: "./dist"
        })
    ],
    mode: "production",
    devtool: "source-map",
    optimization: {
        minimizer: [new UglifyJsPlugin({
            sourceMap: true,
            parallel: true
        })]
    },
    module: {
        rules: [{
            test: /\.scss$/,
            loaders: [
                MiniCssExtractPlugin.loader,
                "css-loader",
                "resolve-url-loader",
                "sass-loader"
            ]
        },
        {
            test: /\.css$/,
            loaders: [
                MiniCssExtractPlugin.loader,
                "css-loader",
                "resolve-url-loader",
            ]
        }]
    }
});