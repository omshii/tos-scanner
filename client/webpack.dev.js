const merge = require("webpack-merge");
const { default: common } = require("./webpack.common");
const { optimize, NoEmitOnErrorsPlugin, NamedModulesPlugin, DefinePlugin } = require("webpack");
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");


exports.default = merge(common, {
    devtool: "eval-source-map",
    mode: "development",
    devServer: {
        hot: true,
        port: 8081,
        historyApiFallback: true
    },
    plugins: [
        new HardSourceWebpackPlugin(),
        new optimize.OccurrenceOrderPlugin(false),
        new NoEmitOnErrorsPlugin(),
        new NamedModulesPlugin(),
        new DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("development")
        })
    ],
    module: {
        rules: [{
            test: /\.scss$/,
            loaders: [
                "vue-style-loader",
                "css-loader",
                "resolve-url-loader",
                "sass-loader"
            ]
        },
        {
            test: /\.css$/,
            loaders: [
                "vue-style-loader",
                "css-loader",
                "resolve-url-loader",
            ]
        }]
    }
});