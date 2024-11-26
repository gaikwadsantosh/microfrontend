Key Files and Directories from the shell app
--------------------------------------------
    public/: contains static assets such as index.html.
    src/: Contains the application's source code (React components, configuration, etc.).
    .babelrc: Configuration file for Babel, the JavaScript transpiler.
    package.json: Defines the project's dependencies and scripts.
    package-lock.json: Locks the dependencies for consistent builds.
    webpack.config.js: Configuration for Webpack, often used for Module Federation.

Shell App is the host applcation used to host all other micro frontend applciaiton as a single app. Use following steps to create and run shell app.
--------------------------------------------
1. Install Node.js (version 16+ recommended) and verify it
    node -v
    npm -v
2. Create a new folder for your project and navigate to it and install required modules:
    mkdir react-shell-app
    cd react-shell-app
    npm init -y
    npm install react react-dom
    npm install webpack webpack-cli webpack-dev-server html-webpack-plugin webpack-merge --save-dev
    npm install @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev
    npm install style-loader css-loader --save-dev
    npm install eslint eslint-plugin-react --save-dev
3. Use create-react-app or manually initialize the app:
    npx create-react-app shell-app
    cd shell-app
4. Install dependencies for Webpack Module Federation and React:
    npm install webpack webpack-cli webpack-dev-server html-webpack-plugin @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev
5. Create a webpack.config.js in the root of your app:
    This file is used to build and package microfrontend apps, and has a reference to all the microfrontend apps using ModuleFederationPlugin
6. Modify the package.json: Add webpack scripts:
    "scripts": {
    "start": "webpack serve --mode development",
    "build": "webpack --mode production"
    }
7. Update src/index.js:
8. Ensure public/index.html has a div with id="root":
9. Define remotes in the ModuleFederationPlugin of webpack.config.js:
    remotes: {
        mfe1: 'mfe1@http://localhost:3001/remoteEntry.js',
    }
10. Add remote component loading in your app.js:
    const Button = React.lazy(()=> import('MicroFrontend/Button'))
11. Run applicaiton on dev server
    npm start
12. Build     
    npm run build
--------------------------------------------
--------------------------------------------

Microfrontend App
--------------------------------------------
Following key files and directories:

    webpack.config.js: Configuration for Webpack, including Module Federation.
    public/: contains static files, including index.html.
    src/: Contains source code for the microfrontend application.
    .babelrc: Babel configuration file for JavaScript transpiling.
    package.json: Lists dependencies and project metadata.
    package-lock.json: Locks dependencies for consistent installations



Step-by-Step Guide to Create and Run MFE1
--------------------------
1. Export module using ModuleFederationPlugin

  plugins: [
    htmlPlugin,
    new ModuleFederationPlugin({
      name: "MicroFrontend",
      filename: "remoteEntry.js",
      exposes:{
        "./Button":"./src/Button"
      }
    })
  ]

2. Make sure the remoteEntry.js file from MFE1 is accessible at http://localhost:3001/remoteEntry.js.

3. Update the host (React Shell) application’s Webpack configuration to reference MFE1:
    remotes: {
    mfe1: 'mfe1@http://localhost:3001/remoteEntry.js',
    }

4. Build and Run
    npm run build
