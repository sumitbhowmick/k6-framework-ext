var webpack = require('webpack');
var path = require('path');

const Dotenv = require('dotenv-webpack');
module.exports = {
  mode: 'production',//production
  entry: './main.js',//k6 driver script 
  //xpCompareTest
  output: {
    path: path.resolve(__dirname, 'build'),
    libraryTarget: 'commonjs',
    filename: 'app.bundle.js',
    publicPath: '',//Added with webpack 5.74.0 & node 16.16.0
    //globalObject: 'this', //Added for ReferenceError associated in AmplifyLogin
  },
  plugins: [
    new Dotenv({
      path: `./environments/${process.env.APP_ENV}.env`
    })
    /*new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
  })*/
  ],
  /*optimization:{
    splitChunks: { chunks: 'all' }
  },*/
  module: {
    rules: [
      {
        test: /\.js$/,
        //exclude: /node_modules/,//Added to avoid Window not defined error, not resolved
        loader: 'babel-loader',
      },
    ],
  },
  stats: {
    colors: true,
  },
  target: 'web',
  externals: /^(k6|https?\:\/\/)(\/.*)?/,
  devtool: 'source-map',
};
