"use strict";
const path = require("path");
const utils = require("./utils");
const webpack = require("webpack");
const config = require("../config");
const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.conf");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtraPlugin = require("mini-css-extract-plugin");
const OptimizeCSSPlugin = require("optimize-css-assets-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

const env = require("../config/prod.env");

const webpackConfig = merge(baseWebpackConfig, {
  mode: "production",
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath("js/[name].[chunkhash].js"),
    chunkFilename: utils.assetsPath("js/[id].[chunkhash].js")
  },
  optimization: {
    usedExports: true, // 开启tree-shaking的打点标识
    runtimeChunk: {
      name: "manifest"
    },
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin({
        parallel: true,
        extractComments: false,
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true
          },
          format: {
            comments: false
          }
        }
      }),
      new OptimizeCSSPlugin({
        cssProcessorOptions: config.build.productionSourceMap
          ? { safe: true, map: { inline: false } }
          : { safe: true }
      })
    ],
    splitChunks: {
      chunks: "async",
      minSize: 20000, // 大于20kb的才分割
      minChunks: 1, // 模块至少使用的次数
      maxAsyncRequests: 5, // 同时加载的模块最多是5个，只分割同时引入的前5个文件
      maxInitialRequests: 3, // 首页加载的时候引入的文件最多3个
      cacheGroups: {
        // 将模块放在缓存里面一起打包分割
        vendors: {
          // 工程基础包 例如包括vue、vue-router、axios等常用不改变的包，可以做缓存
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "initial",
          priority: -10,
          reuseExistingChunk: false
        },
        app: {
          // 业务基础包大部分不是node_modules的模块，例如我们在common中存放的一些基础组件，其次是一些三方的组件库（这些是在node_modules中的，但是因为经常变动所以不适宜放在vendor中）
          minChunks: 3,
          name: "app",
          priority: -20,
          reuseExistingChunk: true
        },
        styles: {
          // 样式分包
          test: /\.(scss|css|less)$/,
          name: "styles",
          chunks: "all",
          minChunks: 1,
          reuseExistingChunk: true,
          enforce: true
        }
      }
    }
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      "process.env": env
    }),
    new MiniCssExtraPlugin({
      filename: utils.assetsPath("css/[name].[contenthash].css"),
      chunkFilename: utils.assetsPath("css/[name].[contenthash].css")
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: "index.html",
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: "auto"
    }),
    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    // split vendor js into its own file
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: "vendor",
    //   minChunks(module) {
    //     // any required modules inside node_modules are extracted to vendor
    //     return (
    //       module.resource &&
    //       /\.js$/.test(module.resource) &&
    //       module.resource.indexOf(path.join(__dirname, "../node_modules")) === 0
    //     );
    //   }
    // }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'manifest',
    //   minChunks: Infinity
    // }),
    // This instance extracts shared chunks from code splitted chunks and bundles them
    // in a separate chunk, similar to the vendor chunk
    // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'app',
    //   async: 'vendor-async',
    //   children: true,
    //   minChunks: 3
    // }),

    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "../static"),
        to: config.build.assetsSubDirectory,
        ignore: [".*"]
      }
    ])
  ]
});

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require("compression-webpack-plugin");

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: new RegExp(
        "\\.(" + config.build.productionGzipExtensions.join("|") + ")$"
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  );
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;
  webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = webpackConfig;
