const webpackConfig = require('./webpack.config');

module.exports = function (config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      './node_modules/es6-promise/dist/es6-promise.js',
      'tests.bundle.js',
      'tests-common.bundle.js'
    ],
    preprocessors: {
      'tests.bundle.js': ['webpack'],
      'tests-common.bundle.js': ['webpack']
    },
    webpack: {
      resolve: webpackConfig.resolve,
      module: webpackConfig.module,
      externals: {
        'jsdom': 'window',
        'cheerio': 'window',
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
      }
    },
    webpackServer: {
      noInfo: true
    },
    reporters: ['spec'],
    port: 8089,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: true,
    reportSlowerThan: 500
  });
};