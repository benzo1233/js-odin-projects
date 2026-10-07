// webpack.config.js
import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin"

export default {
    mode: "production",
    entry: "./src/modules/index.js",
    output: {
        filename: "main.js",
        path: path.resolve(import.meta.dirname, "dist"),
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
            },
            {
                test: /\.(woff2?|woff?|ttf|otf|eot)$/i,
                type: "asset/resource",
                generator: {
                    filename: "fonts/[name][ext]"
                }
            }

        ],
    },
};
