var path = require('path');

const Dotenv = require('dotenv-webpack');
module.exports = {
  mode: 'production',//production
  entry: './main.js',//k6 driver script 
  output: {
    path: path.resolve(__dirname, 'build'),
    libraryTarget: 'commonjs',
    filename: 'app.bundle.js',
    publicPath: '',
  },
  plugins: [
    new Dotenv({
      path: `./environments/${process.env.APP_ENV}.env`
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
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
