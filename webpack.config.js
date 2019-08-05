var path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin');
var webpack = require('webpack');

const plugins = [
  new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery",
    "window.jQuery": "jquery",
    moment: 'moment',
    Raphael: 'raphael'
  }),
  new webpack.ContextReplacementPlugin(/\.\/locale$/, 'empty-module', false, /js$/),
  new MiniCssExtractPlugin({
    filename: 'app.css',
    disable: false,
    allChunks: true
  }),
  new CopyPlugin([{
    from: 'resources/assets/img',
    to: path.resolve(__dirname, 'public/img')
  }, ]),
]

module.exports = {
  mode: 'production',
  entry: './resources/assets/js/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'main.js',
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      automaticNameMaxLength: 30,
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          ecma: undefined,
          warnings: false,
          parse: {},
          compress: {},
          mangle: true,
          module: false,
          output: null,
          toplevel: false,
          nameCache: null,
          ie8: false,
          keep_classnames: undefined,
          keep_fnames: false,
          safari10: false,
        },
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: ['default', {
            discardComments: {
              removeAll: true
            },
          }],
        },
      }),

    ],
  },
  devtool: 'source-map',
  module: {
    rules: [{
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ]
      },

      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: ['babel-loader']
      },
      {
        test: /\.((svg)(\?v=[0-9]\.[0-9]\.[0-9]))|(svg|jpe?g|png|gif|ico)$/,
        use: ['url-loader?limit=10000']
      },
      {
        test: /\.((woff2?|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9]))|(woff2?|ttf|eot)$/,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: 'font',

          }
        }]
      },
    ]
  },
  plugins: plugins

};
