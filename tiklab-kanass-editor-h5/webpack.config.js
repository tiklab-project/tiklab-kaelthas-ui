// webpack.config.js
const { resolve } = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
module.exports = {
    // 组件库的起点入口
    entry: './src/indexumd.js',
    output: {
        filename: "r-ui.umd.js", // 打包后的文件名
        path: resolve(__dirname, 'dist'), // 打包后的文件目录：根目录/dist/
        library: 'rui', // 导出的UMD js会在window挂rui，即可以访问window.rui
        libraryTarget: 'umd' // 导出库为UMD形式
    },
    devtool: "#source-map",
    resolve: {
        // webpack 默认只处理js、jsx等js代码
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    externals: {
        // 打包过程遇到以下依赖导入，不会打包对应库代码，而是调用window上的React和ReactDOM
        // import React from 'react'
        // import ReactDOM from 'react-dom'
        'react': 'React',
        'react-dom': 'ReactDOM'
    },
    // 模块
    module: {
        // 规则
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif)/,
                exclude: /node_modules/,
                use: {
                    loader: 'url-loader',
                    options: {
                        // publicPath: 'images',
                        outputPath: 'images/',
                        name: '[name].[ext]', // 图片输出的路径
                        limit: 8 * 1024,
                    }
                }
            },
            // {
            //     test: /\.svg/,
            //     exclude: /node_modules/,
            //     use: {
            //         loader: 'file-loader',
            //         options: {  
            //             // publicPath: 'images',
            //             outputPath: 'images/',
            //             name: '[name].[ext]', // 图片输出的路径
            //         }
            //     }
            //   }
            {
                test: /\.svg$/,
                exclude: /node_modules/,
                include: [path.resolve(__dirname,'./src/assets/svg')],
                use: [
                    { loader: 'svg-sprite-loader', options: {symbolId: 'icon-[name]'} },
                    { loader: 'svgo-loader', options: {} },
                ]
            }
        ]
    },
    plugins: [
        // 插件用于最终的导出独立的css的工作
        new MiniCssExtractPlugin({
            filename: 'r-ui.umd.css'
        }),
    ]
};
