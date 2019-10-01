const MODE = "production"
// const MODE = "development"
const enabledSourceMap = MODE === "development"

const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: MODE,
  entry: './src/index.js',
  output: {
    path: `${__dirname}/docs`,
    filename: 'main.js'
  },
  devServer: {
    contentBase: './docs'
  },
  module: {
    rules: [
      {
        test: /\.scss/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              url: false,
              sourceMap: enabledSourceMap,
              importLoaders: 2
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: enabledSourceMap
            }
          }
        ]
      },
      {
        test: /\.html$/,
        loader: "html-loader"
      }
    ]
  },
  plugins: [
    new UglifyJSPlugin(),
    new HtmlWebpackPlugin({
      minify: true,
      meta: {
        'content-type': 'text/html; charset=UTF-8',
        viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
      },
      template: "./src/html/index.html"
    })
  ]
}