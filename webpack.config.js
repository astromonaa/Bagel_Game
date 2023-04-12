const path = require('path')
const htmlPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd

const filename = ext => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: './index.js',
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'assets/[name][ext][query]'
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env']
              ]
            }
          }
        ]
      },
      {
        test: /\s?[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new htmlPlugin({
      template: 'index.html',
      minify: {
        removeComments: isProd,
        collapseWhitespace: isProd
      }
    }),
    new MiniCssExtractPlugin({
      filename: filename('css')
    })
  ],
  devtool: isDev ? 'source-map' : false,
  devServer: {
    port: 3000,
    hot: isDev
  }
}