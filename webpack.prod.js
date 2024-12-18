const webpack = require('webpack')
const { merge } = require('webpack-merge');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const optimizeCss = require('optimize-css-assets-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

const baseWebpackConfig = require('./webpack.base');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = merge(baseWebpackConfig, {
    mode: 'production',
    entry: [
        path.resolve(__dirname, './src/index.js')
    ],
    plugins: [
        // new UglifyJSPlugin(),
        new optimizeCss({
            assetNameRegExp: /\.css$/g,
            cssRepositorycessor: require('cssnano'),
            cssRepositorycessorOptions: {
                safe: true,
                discardComments: {
                    removeAll: true
                }
            }
        }),
        new BundleAnalyzerPlugin({
            analyzerPort: 8481,
        }),
        new ProgressBarPlugin()
    ],
    optimization: {
        minimize: true,
        nodeEnv: process.env.NODE_ENV,
        splitChunks: {
            chunks: "all",
            minSize: 30000, // 默认值，超过30K才独立分包
            minChunks: 1,
            maxAsyncRequests: 7,
            maxInitialRequests: 5,
            automaticNameDelimiter: "--", // 分包打包生成文件的名称的连接符
            name:false,
            cacheGroups: { //  cacheGroups 缓存组，如：将某个特定的库打包
                lodash: {
                    name: "chunk-lodash",
                    chunks:"all",
                    test: /lodash/,
                    priority: 0,
                    reuseExistingChunk: true
                },
                antIcon: {
                    name: "chunk-antIcon",
                    chunks: "all",
                    test: /@ant-design/,
                    priority: 0,
                    reuseExistingChunk: true //遇到重复包直接引用，不重新打包
                },
                tiklabEamUI: {
                    name: "chunk-tiklab-eam-ui",
                    chunks: "all",
                    test: /tiklab-eam-ui/,
                    priority: 0,
                    reuseExistingChunk: true
                },
                tiklabPrivilegeUI: {
                    name: "chunk-tiklab-privilege-ui",
                    chunks: "all",
                    test: /tiklab-privilege-ui/,
                    priority: 0,
                    reuseExistingChunk: true
                },
                tiklabMessageUI: {
                    name: "chunk-tiklab-message-ui",
                    chunks: "all",
                    test: /tiklab-message-ui/,
                    priority: 0,
                    reuseExistingChunk: true
                },
                moment: {
                    name: "chunk-moment",
                    chunks: "all",
                    test: /moment/,
                    priority: 0,
                    reuseExistingChunk: true
                },
                antdUI: {
                    name: "chunk-antdUI",
                    chunks: "all",
                    test: /antd/,
                    priority: 1,
                    reuseExistingChunk: true
                },
                rcomponent: {
                    name: "chunk-rcomponent",
                    chunks: "all",
                    test: /rc-[a-zA-Z]/,
                    priority: 1,
                    reuseExistingChunk: true
                },
                /* 提取共用部分，一下提取的部分会议commons 命名 */
                commons: {
                    name: "commons",
                    test: function (module, chunks) {
                        if (
                            /src\/components\//.test(module.context) ||
                            /src\/util\//.test(module.context) ||
                            /react/.test(module.context) ||
                            /react-dom/.test(module.context) ||
                            /redux/.test(module.context)
                        ) {
                            return true
                        }
                    },
                    chunks: "all",
                    minChunks: 2, //  提取公共部分最少的文件数
                    // minportal: 0 // 提取公共部分最小的大小
                    // enforce: true
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        },
        minimizer: [
            new TerserPlugin({  // 压缩js
                cache: true,
                parallel: true,
                terserOptions: {
                    compress: {
                        drop_console: true,
                        drop_debugger: true // 去除console.log 和debuger
                    },
                }
            })
        ]
    }
});
