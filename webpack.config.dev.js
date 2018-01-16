const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const baseWebpackConfig = require('./webpack.config.base');
const merge = require('webpack-merge');

module.exports = merge(baseWebpackConfig, {
    devServer: {
        port: 9000,
        hot: true,
        contentBase: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        proxy: {
            '/api/*': {
                target: 'https://fireball.studio/',
                changeOrigin: true,
            },
        },
    },
    module: {
        rules: [
            {
                test: /\.scss$|\.css$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'postcss-loader', 'sass-loader'],
                    fallback: 'style-loader',
                }),
            },
        ],
    },
});
