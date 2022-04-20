import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default (env) => ({
  mode: env.WEBPACK_SERVE ? 'development' : 'production',
  devtool: env.WEBPACK_SERVE ? 'eval-cheap-source-map' : undefined,
  entry: [ './src/index.js' ],
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({ template: './src/index.pug' })
  ],
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [ 'pug-loader' ]
      },
      {
        test: /\.css$/,
        use: [ MiniCssExtractPlugin.loader, 'css-loader' ]
      },
      {
        test: /\.styl$/,
        exclude: /node_modules/,
        use: [ MiniCssExtractPlugin.loader, 'css-loader', 'stylus-loader' ]
      }
    ]
  },
  output: {
    path: __dirname + '/docs'
  },
  devServer: {
    watchFiles: {
      paths: 'src/**',
      options: {
        ignore: '.*'
      }
    }
  }
})
