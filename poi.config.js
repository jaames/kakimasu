try {
  var privConfig = require("./config.private.js");
}
catch (e) {
  if (e instanceof Error && e.code === "MODULE_NOT_FOUND")
    var privConfig = {};
  else
    throw e;
}

module.exports = {
  resolve: true,
  html: {
    template: "./src/templates/index.html",
    title: "Kakimasu",
    baseURL: "https://kakimasu.rakujira.jp",
    description: "Learn to write Japanese Hiragana and Katakana!",
    creator: "@rakujira",
    googleAnalytics: privConfig.googleAnalytics || false,
    webfontFamilies: "Poppins:600:latin"
  },
  mergeConfig: {
    module: { loaders: [
      { test: /\.json$/, loader: "json-loader" }
    ]},
  }
}
