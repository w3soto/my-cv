
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = (env) => ({
    mode: env.mode === "production" ? "production" : "development",
    plugins: [
        new MiniCssExtractPlugin({
            filename: env.mode === "production" ? "[contenthash].css" : "main.css",
        }),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            inject: "body",
            scriptLoading: "blocking"
        }),
        // copy everything from assets folder
        new CopyWebpackPlugin({
            patterns: [
                { from: "./src/assets", to: "assets" }
            ]
        })
    ],
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
        ],
    },
    entry: {
        main: "./src/main.js" // main.scss is imported here...
    },
    output: {
        clean: true,
        filename: env.mode === "production" ? "[contenthash].js" : "main.js",
        assetModuleFilename: "assets/[name][ext]"
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.(sc|c)ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                    "postcss-loader",
                ]
            },
            {
                test: /\.js$/i,
                exclude: /node_modules/,
                use: [
                    "babel-loader"
                ]
            },
            // copy only if assets was loaded by javascript
            {
                test: /assets\/*/i,
                type: "asset/resource",
            },
        ]
    },
    devtool: "source-map",
    target: "web",
    devServer: {
        static: {
            directory: "./dist",
        },
        port: 8090,
        compress: true,
        hot: true,
        watchFiles: ["*"]
    }
});
