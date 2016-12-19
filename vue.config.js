module.exports = {
  title: 'kakimasu',
  resolve: true,
  template: "src/templates/index.html",
  mergeConfig: {
    module: {loaders: [
      { test: /\.json$/, loader: "json-loader" }
    ]},
  }
}
