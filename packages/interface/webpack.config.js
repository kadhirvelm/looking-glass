const webpack = require("webpack");
const path = require("path");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    output : {
        path : path.resolve(__dirname , "dist"),
    },

    mode: "production",

    devServer: {
        contentBase: path.resolve(__dirname, "./src"),
        hot: true,
        inline: true,
        port: 3000,
        publicPath: "/interface",
        openPage: "interface/index.html",
        stats: {
            colors: true,
            hash: false,
            version: false,
            timings: false,
            assets: false,
            chunks: false,
            modules: false,
            reasons: false,
            children: false,
            source: false,
            errors: false,
            errorDetails: false,
            warnings: false,
            publicPath: false
        }
    },

    module: {
        rules: [
            {
                test: /\.s(a|c)ss$/,
                include: path.resolve(__dirname, 'src'),
                loader: [
                    miniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: false,
                        }
                    }
                ]
            },
            {
                test: /\.ts(x?)$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/,
                use: [
                    {
                        loader: "cache-loader",
                    },
                    {
                        loader: "react-hot-loader/webpack",
                    },
                    {
                        loader: "ts-loader",
                        options: {
                            transpileOnly: true,
                            experimentalWatchApi: true,
                        }
                    }
                ]
            },
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/index.html",
        }),
        new miniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[name].css"
        }),
    ],

    resolve: {
        extensions: [".js", ".ts", ".tsx", ".scss"],
        symlinks: false,
    },

    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    }
};