const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VersionFile = require("webpack-version-file");

module.exports = {
  mode: "development",
  entry: {
    index: "./src/index.js"
  },
  devtool: "eval-source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { 
            presets: [
              ["@babel/preset-env", {targets: {node: "current"}}],
              "@babel/preset-react", 
              "@babel/preset-typescript"
            ] 
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpg|jpeg)$/i,
        type: "asset/resource"
      },
      {
        test: /\.html$/i,
        loader: "html-loader"
      }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
    filename: "videogamelibrary.js",
    clean: true
  },
  devServer: {
    static: {
        directory: path.join(__dirname, 'dist'),
    },
    port: 9000,
    liveReload: false,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: "Video Game Library",
      template: "src/index.html"
    }),
    new VersionFile({
      output: "./dist/version.txt",
      data: {
        commit: require("child_process").execSync("git rev-parse --short HEAD").toString().trim()
      },
      templateString: "<%= name %>@<%= version %>+<%= commit %>\nBuild date: <%= buildDate %>"
    })
  ]
};