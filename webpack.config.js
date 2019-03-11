const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  favicon: path.join(__dirname, "examples/src/favicon.png"),
  template: path.join(__dirname, "examples/src/index.html"),
  filename: "./index.html"
});

module.exports = {
  entry: path.join(__dirname, "examples/src/index.js"),
  output: {
    path: path.join(__dirname, "examples/dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: ["file-loader", "image-webpack-loader"]
      }
    ]
  },
  plugins: [htmlWebpackPlugin],
  resolve: {
    extensions: [".js", ".jsx", ".png"]
  },
  devServer: {
    port: 3001
  }
};
