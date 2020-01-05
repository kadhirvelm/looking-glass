const path = require("path");

module.exports = {
    output : {
        filename: "index.js",
        path : path.resolve(__dirname , "dist"),
    },

    mode: process.env.NODE_ENV,

    target: "electron-main",

    node: {
        __dirname: false
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                include: path.resolve(__dirname, "src"),
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            experimentalWatchApi: true,
                        }
                    }
                ]
            },
        ]
    },

    resolve: {
        extensions: [".js", ".ts"],
    },
};