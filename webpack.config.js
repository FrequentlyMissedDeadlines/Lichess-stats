const webpack = require("webpack");
const path = require("path");
const glob = require("glob");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

let config = {
  entry: {
    main: glob.sync('./src/index.js')
  },

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: './lichess-stats.js'
  },

  plugins: [
    new NodePolyfillPlugin()
  ],

  mode: 'production'
}

module.exports = config;