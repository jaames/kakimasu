var webpack = require("webpack");

module.exports = {
  resolve: true,
  html: {
    template: "./src/templates/index.html",
    title: "Kakimasu",
    baseURL: "https://kakimasu.rakujira.jp",
    description: "Learn to write Japanese Hiragana and Katakana!",
    creator: "@rakujira",
    webfontFamilies: "Poppins:600:latin"
  },
  webpack(config) {
    config.module.loaders = [({ test: /\.json$/, loader: "json-loader" })];
    config.plugins.push(new webpack.BannerPlugin({
        banner: [
          "kakimasu.rakujira.jp",
          "--------------------",
          "Author: James Daniel (github.com/jaames | rakujira.jp | @rakujira)",
          "Build hash: [hash]",
          "Chunk hash: [chunkhash]",
          "Last updated: " + new Date().toDateString(),
        ].join("\n")
      }));
    return config;
  }
}
