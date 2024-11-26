const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  entry: './src/main.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'http://localhost:4200/', // Adjust according to MFE1's hosting setup
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'mfe2', // Unique name for this MFE
      filename: 'remoteEntry.js', // Remote entry file for exposure
      exposes: {
        './AppModule': './src/app/app.module.ts', // Exposing Angular AppModule
      },
      shared: {
        '@angular/core': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        '@angular/common': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        '@angular/platform-browser': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        '@angular/platform-browser-dynamic': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        rxjs: { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        'zone.js': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
      },
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  devServer: {
    static: './dist',
    open: true,
    port: 4200,
  },
};
