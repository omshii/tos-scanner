const path = require("path");
const webpack = require("webpack");
const git = require("git-rev-sync");

const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");

const output = path.resolve(__dirname, "dist");

const plugins = [
    new VueLoaderPlugin(),
    new ForkTsCheckerWebpackPlugin({
        tslint: true,
        vue: true,
        workers: ForkTsCheckerWebpackPlugin.TWO_CPUS_FREE
    }),
    new HtmlWebpackPlugin({
        template: "src/index.html",
        xhtml: true
    }),
    new CleanWebpackPlugin(),
];

exports.revision = git.long();

/** @type {webpack.Configuration} */
exports.default = {
    entry: ["./src/index.ts"],
    context: __dirname,
    plugins,
    output: {
        path: output,
        publicPath: "/",
        filename: "bundle.js"
    },
    optimization: {
        runtimeChunk: false,
        splitChunks: {
            chunks: "all"
        }
    },
    module: {
        rules: [{
            test: /\.ts$/,
            use: [{
                loader: "babel-loader",
                options: {
                    "presets": [
                        [require("@babel/preset-env").default, {
                            "modules": false,
                            "useBuiltIns": "usage",
                            "corejs": 3
                        }]
                    ],
                    "plugins": [
                        require("@babel/plugin-syntax-dynamic-import").default
                    ]
                }
            }, {
                loader: "ts-loader",
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                    silent: false,
                    transpileOnly: true
                }
            }],
            exclude: /node_modules/
        },
        {
            test: /\.(png|jpg|gif|svg|woff)$/,
            loader: "file-loader",
            options: {
                name(file) {
                    if (process.env.NODE_ENV === "development")
                        return "[name]-[hash].[ext]";

                    return "[hash].[ext]";
                },
                outputPath: "res/",
                publicPath: "res/"
            }
        },
        {
            test: /\.vue$/,
            loader: "vue-loader",
            options: {
                cacheBusting: true,
                transformAssetUrls: {
                    video: ['src', 'poster'],
                    source: 'src',
                    img: 'src',
                    object: 'data',
                    image: 'xlink:href'
                }
            }
        }]
    },
    resolve: {
        extensions: [".vue", ".ts", ".js"],
        alias: {
            "vue$": "vue/dist/vue.esm.js",
            "@lib": path.join(__dirname, "src/lib"),
            "@component": path.join(__dirname, "src/component"),
            "@control": path.join(__dirname, "src/component/control"),
            "@page": path.join(__dirname, "src/component/page"),
            "@layout": path.join(__dirname, "src/component/layout"),
            "@res": path.join(__dirname, "src/res")
        }
    }
};