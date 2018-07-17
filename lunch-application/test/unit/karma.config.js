var webpackConfig = require('../../build/webpack.test.config.js')

module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['mocha', 'sinon-chai', 'phantomjs-shim'],
    reporters: ['spec', 'coverage'],
    files: ['./index.js'],
    preprocessors: {
      './index.js': ['webpack', 'sourcemap']
    },
    plugins: [
      'karma-mocha',
      'karma-sinon-chai',
      'karma-phantomjs-launcher',
      'karma-webpack'
    ],
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
    coverageReporter: {
      dir: './coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' }
      ]
    },
    port: 3001,
    customLaunchers: {
      'PhantomJS_custom': {
          base: 'PhantomJS',
          debug: true,
      }
    }
  })
}
