const coveragePathIgnorePatterns = [
  'Root.js',
  'reducers/index.js',
  'sagas/sagaIndex.js',
  'store/',
  'client.js',
  'routes.js',
  'Logger.js',
  'src/index.js',
  'src/server.jsx',
  'src/config.js',
]

const config = {
  globals: {
    __SERVER__: false,
  },
  testURL: 'http://localhost/',
  coverageThreshold: {
    global: {
      statements: 94.5,
      branches: 90,
      functions: 95,
      lines: 95,
    },
  },
  moduleFileExtensions: [
    '',
    'json',
    'js',
    'jsx',
  ],
  moduleDirectories: [
    'src',
    'node_modules',
  ],
  collectCoverageFrom: [
    'src/**/*.js',
    'src/**/*.jsx',
    '!src/**/*.story.jsx',
    '!src/**/*.regression.js',
  ],
  coveragePathIgnorePatterns,
  testMatch: [
    '<rootDir>/(src|templates)/**/__tests__/**/*.js?(x)',
    '<rootDir>/(src|templates)/**/?(*.)(spec|test).js?(x)',
  ],
  testPathIgnorePatterns: [
    'tests/e2e',
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/src/config/testUtils/__mocks__/fileMock.js',
    '\\.(css|scss)$': '<rootDir>/src/config/testUtils/__mocks__/styleMock.js',
    '../../dist/asset-manifest.json': '<rootDir>/src/config/testUtils/__mocks__/asset-manifest-mock.json',
  },
  coverageDirectory: '<rootDir>/reports/coverage',
  reporters: [
    'default',
  ],
  rootDir: '../../',
  snapshotSerializers: [
    '<rootDir>/node_modules/enzyme-to-json/serializer',
  ],
  setupTestFrameworkScriptFile: '<rootDir>config/jest/setupTests.js',
  modulePathIgnorePatterns: [
    '<rootDir>/.*/__mocks__',
  ],
}

module.exports = config
