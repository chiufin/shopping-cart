const webpackNodeExternals = require('webpack-node-externals')

const config = {
  target: 'node',
  mode: 'production',
  entry: [
    './src/server',
  ],
  output: {
    filename: 'server.js',
    chunkFilename: 'server/[id].chunk.js', // TODO: Disable chunks server-side
    publicPath: '/assets/argos/',
  },
  resolve: {
    mainFields: ['esnext', 'browser', 'module', 'main'],
    extensions: ['.js', '.json', '.jsx'],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: false,
        default: false,
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [
          /src/,
        ],
        loader: 'babel-loader',
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/',
          },
        }],
      },
      {
        test: /\.s?css$/,
        include: [
          /src/,
        ],
        use: [
          'css-loader/locals?modules&localIdentName=[name]__[local]__[hash:base64:5]',
          'sass-loader',
        ],
      },
      {
        test: /\.svg$/,
        include: [
          /src/,
        ],
        loader: 'svg-inline-loader',
        options: {
          removeSVGTagAttrs: false,
        },
      },
    ],
  },
  externals: [
    webpackNodeExternals({}),
  ],
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
    setImmediate: false,
  },
}

module.exports = config
