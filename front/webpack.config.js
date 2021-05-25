const HtmlWebpackPlugin = require('html-webpack-plugin');
const { LibManifestPlugin } = require('webpack');

module.exports = {
    modules: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },  
        ],
    },
    mode: 'development',
    entry: './index.js',
    output: {
        filename: 'main.js'
    },
    plugins: [
        new HtmlWebpackPlugin({ template: 'index.html' })
    ]
}