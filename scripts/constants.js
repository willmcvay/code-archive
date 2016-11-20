module.exports = {

  WEBPACK_DEV_ENTRY_CLIENT   : 'webpack-dev-server/client?http://localhost:8000/',
  WEBPACK_HOT_RELOADER_ClIENT: 'webpack/hot/only-dev-server',
  BUNDLE_PATH_CLIENT         : './client/app/client',
  PROD_BUNDLE_CLIENT         : '/public/js/app.js',
  DEV_BUNDLE_CLIENT          : 'http://localhost:8000/public/js/app.js',

  WEBPACK_DEV_ENTRY_SERVER   : 'webpack-dev-server/client?http://localhost:3000/',
  WEBPACK_HOT_RELOADER_SERVER: 'webpack/hot/only-dev-server',
  BUNDLE_PATH_SERVER         : './server/server',
  PROD_BUNDLE_SERVER         : './server/server',
  DEV_BUNDLE_SERVER          : 'http://localhost:3000/',
};
