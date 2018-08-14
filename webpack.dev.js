const webpack = require("webpack")
const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin")
// const PreloadWebpackPlugin = require('preload-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const CleanWebpackPlugin = require("clean-webpack-plugin")

const outputDirectory = "dist";

module.exports = {
    mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: "bundle.js"
  },
  module: {
    rules: [
  
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",

          // Could also be write as follow:
          // use: 'css-loader?modules&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
          use: [
            {
              loader: "css-loader",
              query: {
                modules: true,
                localIdentName: "[name]__[local]___[hash:base64:5]"
              }
            },
            "postcss-loader"
          ]
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "sass-loader"]
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg|ttf|eot|woff|woff2)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              // path where the images will be saved
              name: "assets/[name].[ext]"
            }
          }
        ]
      }
    ]
  },
  devServer: {
    port: 3000,
    open: true,
    proxy: {
      "/api": "http://localhost:8080"
    }
  },
  plugins: [
    new CleanWebpackPlugin([outputDirectory]),
    new HtmlWebpackPlugin({
      template: "./src/public/index.html"
      //   favicon: "./public/favicon.ico"
    }),
    // new PreloadWebpackPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin({
      filename: "[name].css",
      allChunks: true
    })
  ]
}
