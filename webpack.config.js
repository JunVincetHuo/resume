const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 抽离html
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  output: {
    publicPath: "",
    filename: "[name].js",
  },
  resolve: {
    // 加快搜索速度
    modules: [path.resolve(__dirname, "node_modules")],
    // es tree-shaking
    mainFields: ["jsnext:main", "browser", "main"],
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        // 提取出css
        loaders: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        include: path.resolve(__dirname, "src"),
      },
      {
        test: /\.(gif|png|jpe?g|eot|woff|ttf|svg|pdf)$/,
        loader: "base64-inline-loader",
      },
    ],
  },
  entry: {
    main: "./src/main.js",
  },
  plugins: [
    // 打包生成html
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html", // 打包后的文件名
      minify: {
        removeAttributeQuotes: false, // 是否删除属性的双引号
        collapseWhitespace: false, // 是否折叠空白
      },
    }),
    new MiniCssExtractPlugin({
      filename: "[name]_[contenthash].css",
    }),
  ],
  devtool: "source-map",
};
