const path = require("path")
const webpack = require("webpack")

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
        'API_ENDPOINT': `"${process.env.DEPLOY_PRIME_URL || process.env.URL || "http://localhost:8888"}"`
    })
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
        'pg-native': path.join(__dirname, 'aliases/pg-native.js'),
        'pgpass$': path.join(__dirname, 'aliases/pgpass.js'),
      },
  },
};
