module.exports = {
  lintOnSave: false,
  runtimeCompiler: true,
  publicPath: '/superadmin/',
  outputDir: 'superadmin',
  configureWebpack: {
    resolve: {
       symlinks: false
    }
  },
  transpileDependencies: [
    '@coreui/utils',
    '@coreui/vue'
  ]
}
