var path = require('path')
var buildConfig = require('../config/buildConfig');//打包配置
var ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.assetsPath = function (_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? buildConfig.build.assetsSubDirectory
    : buildConfig.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}


