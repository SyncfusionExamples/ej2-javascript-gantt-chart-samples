const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// The client and the server are two independent applications inside the
// same solution. The client is served by webpack-dev-server (port 8080)
// and the WebMethod endpoint is exposed by the ASP.NET Core server
// (port 7126). The dev server proxies all /api/* calls to the server
// so the browser can hit the Gantt and the WebMethod service from the
// same origin during development.
//
// In production the client output is generated with `npm run release`
// and the files in `wwwroot/` can be served by any static host.
module.exports = (env, argv) => {
    const isProduction = argv.mode === "production";

    return {
        entry: "./src/index.js",
        output: {
            path: path.resolve(__dirname, "wwwroot"),
            filename: "[name].[chunkhash].js",
            publicPath: "/"
        },
        resolve: {
            extensions: [".js"],
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        isProduction
                            ? MiniCssExtractPlugin.loader
                            : "style-loader",
                        "css-loader",
                    ],
                },
            ],
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: "./src/index.html",
            }),
            ...(isProduction
                ? [
                      new MiniCssExtractPlugin({
                          filename: "css/[name].[chunkhash].css",
                      }),
                  ]
                : []),
        ],

    };
};
