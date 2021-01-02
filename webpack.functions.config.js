const path = require("path")
const ReactServerWebpackPlugin = require('react-server-dom-webpack/plugin');

module.exports = {
  module: {
    rules: [
        {
          test: /\.client\.js/,
          use: {
            loader: path.resolve('./scripts/client-react-loader.js'),
          },
        },
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
        'pg-native': path.join(__dirname, 'aliases/pg-native.js'),
        'pgpass$': path.join(__dirname, 'aliases/pgpass.js'),
      },
  },
};
