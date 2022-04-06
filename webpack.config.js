const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VersionFile = require("webpack-version-file");

/**
 * @returns {string} semver version value based on current commit and value in package.json
 */
const getVersion = () => {
  const commitSha = require("child_process").execSync("git rev-parse --short HEAD").toString().trim();
  const packageJson = require("./package.json");

  return `${packageJson.name}@${packageJson.version}+${commitSha}`;
}

module.exports = {
  mode: "development",
  entry: {
    app: "./src/index.js",
    cli: "./src/cli/cli.ts"
  },
  devtool: "eval-source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/i,
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
        test: /\.css$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader"
          }
        ]
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
  resolve: { extensions: ["*", ".js", ".jsx", ".tsx", ".ts"] },
  output: {
    path: path.resolve(__dirname, "dist/"),
    filename: "[name].js",
    clean: true
  },
  devServer: {
    static: {
        directory: path.join(__dirname, 'dist'),
    },
    port: 9000,
    liveReload: false,
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Video Game Library",
      template: "src/index.html",
      meta: {
        "version": getVersion()
      }
    }),
    new VersionFile({
      output: "./dist/version.txt",
      templateString: getVersion()
    })
  ]
};