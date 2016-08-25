module.exports = {
  WEBPACK_DEV_ENTRY   : 'webpack-dev-server/client?http://localhost:8000/',
  WEBPACK_HOT_RELOADER: 'webpack/hot/only-dev-server',
  BUNDLE_PATH         : './client/app/client',
  PROD_BUNDLE         : '/public/js/app.js',
  DEV_BUNDLE          : 'http://localhost:8000/public/js/app.js'
};
