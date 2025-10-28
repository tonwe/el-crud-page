module.exports = {
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'examples/index.html',
      filename: 'index.html',
      title: 'el-crud-page Demo'
    }
  },
  outputDir: 'demo-dist',
  publicPath: './',
  chainWebpack: config => {
    // 排除编译 src 目录，因为它是库源码
    config.module
      .rule('js')
      .include
      .add(/examples/)
      .end()
      .exclude
      .add(/node_modules/)
      .end();
    
    // 配置别名
    config.resolve.alias
      .set('@', __dirname + '/src');
  },
  css: {
    extract: false
  },
  devServer: {
    port: 8080,
    hot: true,
    open: true
  }
};
