const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const CleanWebpackPlugin = require('clean-webpack-plugin')
const PrerenderSpaPlugin = require('prerender-spa-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const QiniuPlugin = require('qiniu-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const qiniuCfg = require('./qiniu.config')

const TARGET = process.env.npm_lifecycle_event

const common = {
  entry: {
    app: './src/app.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader?cacheDirectory=true',
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          // name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.yml$/,
        loader: 'json-loader!yaml-loader',
      },
      {
        test: /\.md$/,
        loader: './src/utils/md-fm-loader.js',
        options: {
          breaks: true,
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      title: 'lyyourc',
    }),
  ],
  resolve: {
    // https://vuejs.org/v2/guide/installation.html#Standalone-vs-Runtime-only-Build
    // alias: {
    //   'vue$': 'vue/dist/vue.common.js'
    // },
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, "src/static")
  },
}

const production = {
  entry: {
    vendor: ['vue', 'vue-router', 'date-fns'],
  },
  output: {
    filename: '[name].[chunkhash].js',
  },
  devtool: '#source-map',

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: ExtractTextPlugin.extract({
              use: 'css-loader',
              fallback: 'vue-style-loader' // <- this is a dep of vue-loader, so no need to explicitly install if using npm3
            })
          },
        },
      },
    ],
  },
  // http://vue-loader.vuejs.org/en/workflow/production.html
  plugins: [
    new ExtractTextPlugin("[name].[contenthash].css"),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'manifest'] // Specify the common bundle's name.
    }),

    // short-circuits all Vue.js warning code
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),

    // minify with dead-code elimination
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false,
        // drop_console: true,
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src/static'),
        toType: 'dir',
      }
    ]),
    new CleanWebpackPlugin(['dist']),
  ],
}

if (TARGET === 'start') {
  module.exports = merge(common, {
    devtool: '#eval-source-map'
  })
}

if (TARGET === 'build') {
  module.exports = merge.smart(common, production)
}

if (TARGET === 'analyze') {
  module.exports = merge.smart(common, production, {
    plugins: [ new BundleAnalyzerPlugin() ],
  })
}

if (TARGET === 'generate') {
  const fs = require('fs')
  const fileNames = fs
    .readdirSync(path.resolve(__dirname, 'src/contents'))
    .map(file => (
      '/posts/' + file.split('.').slice(0, -1).join('.')
    ))

  module.exports = merge.smart(common, production, {
    output: {
      publicPath: `//${qiniuCfg.domain}`,
    },

    plugins: [
      new PrerenderSpaPlugin(
        // Absolute path to compiled SPA
        path.resolve(__dirname, 'dist'),
        // List of routes to prerender
        [ '/', '/posts', ...fileNames ]
      ),

      new QiniuPlugin({
        ACCESS_KEY: qiniuCfg.ACCESS_KEY,
        SECRET_KEY: qiniuCfg.SECRET_KEY,
        bucket: qiniuCfg.bucket,
        path: '',
        // include: [/\.js$/],
      }),
    ]
  })
}