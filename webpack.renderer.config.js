const rules = require("./webpack.rules");
const plugins = require("./webpack.plugins");

rules.push({
  test: /\.css$/,
  use: [{ loader: "style-loader" }, { loader: "css-loader" }],
});

rules.push({
  test: /\.(png|jp(e*)g|svg)$/,
  use: [
    {
      loader: "url-loader",
      options: {
        limit: 800,
        name: "images/[hash]-[name].[ext]",
      },
    },
  ],
});

module.exports = {
  module: {
    rules,
  },
  plugins,
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css"],
  },
};
