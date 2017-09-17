const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { HIGHLIGHT_LANGUAGE } = require('./src/utils/hightlight.trim')

const PATHS = {
  app: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist'),
  assets: path.join(__dirname, 'src/assets'),
}

const env = process.env.NODE_ENV
const isProd = env === 'production'
const isReport = process.env.npm_config_report

const commonConfig = {
  entry: {
    app: isProd ? PATHS.app : ['react-hot-loader/patch', PATHS.app],
  },
  output: {
    path: PATHS.dist,
    filename: '[name].js',
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      favicon: 'favicon.ico',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.md$/,
        use: 'raw-loader',
      },
      {
        test: /\.(jpg|png|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10 * 1024,
          name: '[name].[hash].[ext]',
        },
      },
    ],
  },
  resolve: {
    alias: {
      '@': PATHS.app,
      assets: PATHS.assets,
    },
    modules: [PATHS.assets, 'node_modules'],
  },
}

const developmentConfig = {
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    // open: true,
    historyApiFallback: true,

    // Display only errors to reduce the amount of output.
    stats: 'errors-only',

    // 0.0.0.0 is available to all network devices
    host: '0.0.0.0', // Defaults to `localhost`
    disableHostCheck: true,
    port: process.env.PORT, // Defaults to 8080

    hotOnly: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
}

const productionConfig = function() {
  const plugins = [
    isReport && new BundleAnalyzerPlugin(),
    new CopyWebpackPlugin([{ from: './static/' }]),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.HashedModuleIdsPlugin(),

    new webpack.ContextReplacementPlugin(
      /highlight\.js\/lib\/languages$/,
      new RegExp(`^./(${HIGHLIGHT_LANGUAGE.join('|')})$`)
    ),

    new webpack.optimize.CommonsChunkPlugin({
      async: 'used-twice',
      minChunks: (module, count) => count >= 2,
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: ({ resource }) =>
        resource &&
        resource.indexOf('node_modules') >= 0 &&
        resource.match(/\.js$/),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime',
    }),
  ].filter(p => p)

  return {
    plugins,
    devtool: 'source-map',
    output: {
      filename: '[name].[chunkhash].js',
      chunkFilename: '[name].[chunkhash].js',
    },
    performance: {
      hints: 'warning', // 'error' or false are valid too
      maxEntrypointSize: 100000, // in bytes
      maxAssetSize: 450000, // in bytes
    },
  }
}

module.exports = merge(
  commonConfig,
  isProd ? productionConfig() : developmentConfig
)
