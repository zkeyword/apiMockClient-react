const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = (webpackConfig, env) => {
    const production = env === 'production'

    if (webpackConfig.module) {
        let stylusLoader = ['style', 'css', 'stylus']

        if (production) {
            webpackConfig.plugins.push(
                new ExtractTextPlugin({
                    filename: '[name].[contenthash:8].css',
                    allChunks: true
                })
            )
            webpackConfig.plugins.push(
                new webpack.LoaderOptionsPlugin({
                    minimize: true,
                    debug: false
                })
            )
            stylusLoader = ExtractTextPlugin.extract({
                use: ['css-loader', 'stylus-loader'],
                fallback: 'style-loader'
            })
        }

        webpackConfig.module.rules.unshift({
            test: /\.styl$/,
            use: stylusLoader
        })

        webpackConfig.module.rules.map((item) => {
            if (item.exclude && item.exclude[2]) {
                item.exclude[2] = /\.(css|less|scss|styl)$/
            }
            return item
        })

        // webpackConfig.noParse = [/moment.js/]
    }
    return webpackConfig
}
