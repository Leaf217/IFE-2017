/**
 * Created by zhu_yeqing on 2017/7/23.
 */
var path = require('path');

module.exports = {
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.(eot|woff|svg|ttf|woff2|gif)(\?|$)/,
                loader: 'file-loader?name=[hash].[ext]'
            },
            {
                test: /\.(jpg|png|gif|svg)$/,
                loader: 'url-loader?limit=8192'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            },
            // {
            //     test: /\.txt$/,
            //     loader: 'raw-loader'
            // }
        ]
    },
    devServer: {
         contentBase: './dist'
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};