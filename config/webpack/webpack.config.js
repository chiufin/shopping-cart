const ManifestPlugin = require('webpack-manifest-plugin')
const ExtractCssChunksPlugin = require('extract-css-chunks-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const boxen = require('boxen')
const chalk = require('chalk')

const pckg = require('../../package')

const argv = process.argv.slice(2)
const portIndex = (argv.indexOf('--port') + 1)
const port = (portIndex && argv[portIndex]) || 3000

const NODE_ENV = process.env.NODE_ENV || 'production'
const modeIndex = (argv.indexOf('--mode') + 1)
const webpackMode = (modeIndex && argv[modeIndex]) || 'production'

const isProduction = NODE_ENV === 'production' && webpackMode === 'production'

const webpackSeverMsg = () => (
/* eslint-disable */
console.log(`\n${boxen(`
${chalk.green(`${pckg.name.charAt(0).toUpperCase()}${pckg.name.slice(1)} v${pckg.version} started`)}
${chalk.grey('-----------------------------------\n')}
${chalk.white(`Local:        `)}${chalk.cyan(`http://localhost:${port}`)}
`, { borderStyle: 'round', padding: 1, borderColor: '#008080' }
)}\n`)
/* eslint-enable */
)

const config = {
  mode: webpackMode,
  target: 'web',
  stats: isProduction
    ? {
      assets: true,
      children: false,
      modules: false,
    } : 'errors-only',
  performance: {
    hints: false,
  },
  entry: [
    '@babel/polyfill',
    './src/client',
  ],
  optimization: isProduction ? {
    splitChunks: {
      cacheGroups: {
        vendors: false,
        default: false,
      },
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: ['default', {
            discardComments: {
              removeAll: true,
            },
          }],
        },
      }),
    ],
  } : {},
  resolve: {
    mainFields: ['esnext', 'browser', 'module', 'main'],
    extensions: ['.js', '.json', '.jsx'],
  },
  output: isProduction ? {
    filename: 'client/main.[hash:8].min.js',
    chunkFilename: 'client/chunk-[id].[chunkhash:8].min.js',
    publicPath: '/assets/argos/',
  } : {
    filename: 'client/client.js',
    chunkFilename: 'client/chunk-[id].js',
    publicPath: '/assets/argos/',
  },
  module: {
    strictExportPresence: true,
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
          ExtractCssChunksPlugin.loader,
          'css-loader?modules&localIdentName=[name]__[local]__[hash:base64:5]',
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
  plugins: [
    isProduction
      ? new ManifestPlugin({ fileName: 'asset-manifest.json' })
      : null,
    isProduction ? new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      reportFilename: '../reports/bundle-visualizer.html',
    }) : null,
    new ExtractCssChunksPlugin(isProduction ? {
      filename: 'client/[name].[hash:8].min.css',
      chunkFilename: 'client/chunk-[id].[chunkhash:8].min.css',
    } : {
      filename: 'client/client.css',
      chunkFilename: 'client/chunk-[id].css',
      hot: true,
    }),
    {
      apply: (compiler) => {
        compiler.hooks.afterEmit.tap('AfterEmitPlugin', () => {
          if (isProduction) console.log('\n\n> Local server starting on http://localhost:8080\n')
          else webpackSeverMsg()
        })
      },
    },
  ].filter(Boolean),
  devServer: {
    port,
    proxy: {
      '/': 'http://localhost:8080',
    },
    noInfo: !isProduction,
    stats: {
      children: isProduction,
    },
  },
  devtool: isProduction ? 'none' : 'cheap-module-eval-source-map',
}

module.exports = config
