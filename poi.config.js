var webpack = require("webpack");

console.log(webpack);

module.exports = {
  output: {
    html: {
      template: "./src/templates/index.html",
      title: "Kakimasu",
      baseURL: "https://kakimasu.rakujira.jp",
      description: "Learn to write Japanese Hiragana and Katakana!",
      creator: "@rakujira",
      webfontFamilies: "Poppins:600:latin",
      meta: {
        "theme-color": "#88cdf1",
        "msapplication-navbutton-color": "#88cdf1"
      }
    },
  },
  configureWebpack(config) {
    // as of webpack 2.0, webpack auto imports 
    // config.module.rules.push({ test: /\.json$/, loader: "json-loader" });
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
