module.exports = function babelConfig(api) {
  api.cache(true)

  const presets = [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: [
            'last 2 Chrome versions',
            'last 2 Firefox versions',
            'Safari >= 9',
            'Edge >= 15',
            'ie 11',
            'last 2 Opera versions',
            'Android >= 4.4',
            'last 2 ChromeAndroid versions',
            'last 2 FirefoxAndroid versions',
            'iOS >= 10',
          ],
        },
      },
    ],
    '@babel/preset-react',
  ]

  const plugins = [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-syntax-import-meta',
    '@babel/plugin-transform-object-assign',
    '@babel/plugin-transform-react-display-name',
    'transform-react-remove-prop-types',
    'react-loadable/babel',
  ]

  const testPlugins = [
    ...plugins,
    'dynamic-import-node',
  ]

  return {
    presets,
    plugins,
    env: {
      test: {
        presets,
        plugins: testPlugins,
      },
    },
  }
}
