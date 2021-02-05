const singleSpaAngularWebpack = require("single-spa-angular/lib/webpack")
  .default;
const { merge } = require("webpack-merge");
const { name } = require("./package.json");

module.exports = (config, options) => {
  const singleSpaWebpackConfig = singleSpaAngularWebpack(config, options);

  return merge(singleSpaWebpackConfig, {
    output: {
      library: `${name}-[name]`,
      libraryTarget: "umd",
    },
    externals: {
      "zone.js": "Zone",
    },
    // 解决404的问题
    devServer: {
      historyApiFallback: true,
    },
  });
};
