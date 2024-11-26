const HtmlWebPackPlugin = require("html-webpack-plugin");
const {ModuleFederationPlugin} = require("webpack").container;
const path = require("path");

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./public/index.html",
  filename: "./index.html"
});
module.exports = {
  mode: 'development',
  devServer: {
    static: path.join(__dirname, "dist"),
    port: 3001,
    historyApiFallback:{
      index:'/public/index.html'
    },
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader"
      }
    }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"], // Resolve these file extensions
  },  
  plugins: [
    htmlPlugin,
    new ModuleFederationPlugin({
      name: "ShellApplication",
      filename: "remoteEntry.js",
      remotes: {
        MicroFrontend: "MicroFrontend@http://localhost:3002/remoteEntry.js",
        mfe2: 'mfe2@http://localhost:4200/remoteEntry.js'
      }
    })
  ]
};

// Checkout: "Checkout@http://localhost:3000/remoteEntry.js"