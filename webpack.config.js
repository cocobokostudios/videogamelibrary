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

const appConfig = {
  mode: "development",
  target: "web",
  entry: {
    app: "./src/index.js",
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
        type: "asset/resource",
        generator: {
          filename: "app/[hash][ext][query]"
        }
      },
      {
        test: /\.html$/i,
        loader: "html-loader"
      }
    ]
  },
  resolve: { 
    extensions: ["*", ".js", ".jsx", ".tsx", ".ts"]
  },
  output: {
    path: path.resolve(__dirname, "dist/"),
    filename: "[name]/[name].js",
  },
  devServer: {
    static: {
        directory: path.join(__dirname, 'dist/app'),
    },
    port: 9000,
    liveReload: false,
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Video Game Library",
      filename: "app/index.html",
      template: "src/index.html",
      meta: {
        "version": getVersion()
      }
    }),
    new VersionFile({
      output: "./dist/app/version.txt",
      templateString: getVersion()
    })
  ]
};

const cliConfig = {
  mode: "development",
  target: "node",
  entry: {
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
      }
    ]
  },
  resolve: { 
    extensions: ["*", ".js", ".jsx", ".tsx", ".ts"]
  },
  output: {
    path: path.resolve(__dirname, "dist/"),
    filename: "[name]/[name].js",
  },
  plugins: [
    new VersionFile({
      output: "./dist/cli/version.txt",
      templateString: getVersion()
    }),
    new webpack.BannerPlugin({
      banner: "#!/usr/bin/env node",
      raw: true,
      entryOnly: true,
      test: /cli\.js$/i
    })
  ],
  ignoreWarnings: [
    {
      module: /yargs-parser\/build\/index\.cjs/i
    },
    {
      module: /yargs\/build\/index\.cjs/i
    }
  ]
};

module.exports = [appConfig, cliConfig];