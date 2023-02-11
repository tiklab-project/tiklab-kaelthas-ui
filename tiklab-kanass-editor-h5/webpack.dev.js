/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: 袁婕轩
 * @Date: 2020-12-18 16:04:03
 * @LastEditors: 袁婕轩
 * @LastEditTime: 2022-04-23 16:14:59
 */

const webpack = require('webpack');
const { merge } = require('webpack-merge');
const path = require('path');
const baseWebpackConfig = require('./webpack.base');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');
const PORT = 3009;
const fs = require('fs');
module.exports = merge(baseWebpackConfig, {
    devtool: 'source-map',
    mode: 'development',
    // entry: [
    //     'react-hot-loader/patch',
    //     `webpack-dev-server/client?http://127.0.0.1:${PORT}/`,
    //     path.resolve(__dirname, './src/index.js')
    // ],
    entry: {
        "DocumentEditor": "./src/modules/edit-slate/containers/editor.js",
        "PreviewEditor": "./src/modules/edit-slate/containers/previewEditor.js"
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        library: '[name]',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    optimization: {
        namedModules: true,
        namedChunks: true,
        runtimeChunk: {
            name: 'runtime'
        },
        minimize: false,
        minimizer: [new TerserPlugin()],
        splitChunks:
        {
            name: false,
            chunks: 'all',
            // minportal: 1,
            minChunks: 1,
            cacheGroups:
            {
                default: false,
                vendors:
                {
                    name: 'common',
                    chunks: 'all',
                    minChunks: 2,
                    test: /node_modules/
                },
                styles:
                {
                    name: 'common',
                    chunks: 'all',
                    minChunks: 2,
                    test: /\.(css|less|scss|stylus)$/,
                    enforce: true,
                    priority: 50
                }
            }
        }
    },

    devServer: {
        contentBase: path.join(__dirname, 'plugin'), //开发服务运行时的文件根目录
        port: PORT,
        historyApiFallback: true,
        inline: true,
        hot: true,
        host: '0.0.0.0',
        hotOnly: true,
        stats: {
            children: false,
        },
        disableHostCheck: true,
        // https: true
        // {
        //     key: fs.readFileSync('./project.key'),
        //     cert: fs.readFileSync('./project.pem'),
        //     passphrase: 'webpack-dev-server',
        //     requestCert: true,
        // },
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ]
});
