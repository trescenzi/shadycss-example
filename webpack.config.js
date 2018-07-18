const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: [path.resolve(__dirname + '/index.js')],
  },

  output: {
    path: path.resolve(__dirname + '/dist'),
    filename: 'app.js',
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  devServer: {
    inline: true,
    port: 9001,
    compress: true,
    stats: { colors: true },
  },
  plugins: [
    // Suppress weird warning in webcomponents-lite due to es6-promise
    // dependency. Doesn't seem to affect anything so ignoring it for now.
    // https://github.com/webcomponents/webcomponentsjs/issues/794
    // https://github.com/stefanpenner/es6-promise/issues/305
    // https://github.com/parcel-bundler/parcel/issues/141
    new webpack.IgnorePlugin(/vertx/),
  ],
};
