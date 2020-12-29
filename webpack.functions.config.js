const path = require("path")
const ReactServerWebpackPlugin = require('react-server-dom-webpack/plugin');

module.exports = {
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    conditionNames: ["react-server", "..."],
    alias: {
        'pg-native': path.join(__dirname, 'aliases/pg-native.js'),
        'pgpass$': path.join(__dirname, 'aliases/pgpass.js'),
      },
  },
};
