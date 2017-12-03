require('babel-polyfill');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')


module.exports = {
    entry: ["babel-polyfill", "./js/main.js"],
    watch: false,
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "game.js",
        publicPath: path.resolve(__dirname)
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    'babel-loader'
                ]
            }
        ]
    },
    plugins: [
        new UglifyJsPlugin()
    ]
};