let path = require('path');

module.exports = {
    entry: "./js/main.js",
    watch: true,
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
    }
};