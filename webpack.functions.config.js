const path = require("path")
const webpack = require("webpack")
const nodeExternals = require('webpack-node-externals');

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
  plugins: [
    new webpack.DefinePlugin({
        'API_ENDPOINT': `"${process.env.DEPLOY_PRIME_URL || process.env.URL || "http://localhost:8888"}"`,
        'BASE_DIR': `"${__dirname}"`
    })
  ],
  externals: [nodeExternals()]
};
