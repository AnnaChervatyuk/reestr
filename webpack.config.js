const HtmlWebpackPlugin = require('html-webpack-plugin'); // Require  html-webpack-plugin plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

module.exports = {
  entry: __dirname + "/src/app/index.js", // webpack entry point. Module to start building dependency graph
  output: {
    path: __dirname + '/dist', // Folder to store generated bundle
    filename: 'bundle.js',  // Name of generated bundle after build
    publicPath: '/' // public URL of the output directory when referenced in a browser
  },


  module: {
      rules: [
          {
            test: /\.scss$/,
            use:  [
              'style-loader',
              MiniCssExtractPlugin.loader,
              'css-loader',
              'sass-loader'
            ]
          },
          {
            test: /\.js$/,
            use: 'babel-loader',
            exclude: [
              /node_modules/
            ]
          },
          {
            test: /\.(png|jpe?g|gif)$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: '[name].[ext]',
                  outputPath: 'dist/img/',
                },
              },
            ],
          },
          {
            test: /\.svg$/i,
            include: /.*sprite\.svg/,
            use: [
                {
                    loader: 'svg-sprite-loader',
                    options: {
                        publicPath: '',
                    }
                },
            ],
        },
      ]
  },
  plugins: [
      new SpriteLoaderPlugin(),
      new CopyWebpackPlugin({
        patterns: [
            { from: 'src/public/images', to: 'images' },
            // { from: 'src/public/sprite.svg', to: '/' },
        ],
      }),
      new MiniCssExtractPlugin({
        filename: 'app.css',
      }),
      new HtmlWebpackPlugin({
          template: __dirname + "/src/public/index.html",
          inject: 'body'
      }),
      new HtmlWebpackPlugin({
        filename: 'site_info.html',
        template: 'src/public/site_info.html'
        }),
      new HtmlWebpackPlugin({
        filename: 'ori.html',
        template: 'src/public/ori.html'
        }),
      new HtmlWebpackPlugin({
        filename: 'site_info-ori.html',
        template: 'src/public/site_info-ori.html'
        }),
      new HtmlWebpackPlugin({
        filename: 'news.html',
        template: 'src/public/news.html'
        }),
      new HtmlWebpackPlugin({
        filename: 'visual.html',
        template: 'src/public/visual.html'
        }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'src/public/index.html'
        }),
      new HtmlWebpackPlugin({
        filename: 'table_preloader.html',
        template: 'src/public/table_preloader.html'
        }),

  ],

  devServer: {  // configuration for webpack-dev-server
      contentBase: './src/public',  //source of static assets
      port: 7700, // port to run dev-server
  }
};
