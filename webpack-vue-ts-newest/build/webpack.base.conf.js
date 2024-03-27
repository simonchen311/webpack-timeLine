"use strict";
const os = require("os");
const path = require("path");
const utils = require("./utils");
const config = require("../config");
const vueLoaderConfig = require("./vue-loader.conf");
const { VueLoaderPlugin } = require("vue-loader");

const threads = os.cpus().length; // cpu核数

function resolve(dir) {
  return path.join(__dirname, "..", dir);
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: "eslint-loader",
  enforce: "pre",
  include: [resolve("src"), resolve("test")],
  options: {
    formatter: require("eslint-friendly-formatter"),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
});

module.exports = {
  context: path.resolve(__dirname, "../"),
  entry: {
    app: "./src/main.js"
  },
  output: {
    path: config.build.assetsRoot,
    filename: "[name].js",
    chunkFilename: "[name].[chunkhash].js",
    assetModuleFilename: utils.assetsPath("img/[name].[hash:7].[ext]"), // 图片字体等通过type:asset处理的统一命名方式
    publicPath:
      process.env.NODE_ENV === "production"
        ? config.build.assetsPublicPath
        : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias: {
      vue$: "vue/dist/vue.esm.js",
      "@": resolve("src")
    }
  },
  plugins: [new VueLoaderPlugin()],
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        include: [
          resolve("src"),
          resolve("test"),
          resolve("node_modules/webpack-dev-server/client")
        ],
        use: [
          {
            loader: "thread-loader", // 开启多进程打包
            options: {
              works: threads
            }
          },
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true, // 开启babel缓存，加速第二次等后续的打包速度直接读取缓存，缓存存放在node_modules/.cache文件下
              cacheCompression: false // 关闭缓存文件压缩
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024
          }
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        type: "asset/resource"
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        type: "asset/resource"
      }
    ]
  },
  node: {
    global: false
  },
  cache: {
    type: "filesystem", // webpack5新增
    buildDependencies: {
      config: [__filename] // 当构建依赖的config文件内容发生变化则缓存失效
    }
  }
};
