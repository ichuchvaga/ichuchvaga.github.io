const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  mode: "development",
  // The application entry point
  entry: {
    main: "./src/pages/home/index.js"
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        use: "vue-loader"
      },
      //use babel-loader to transpile js files
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                debug: false,
                targets: {
                  ie: 11,
                },
              }
            ]
          ]
        }
      },

      // css-loader to bundle all the css files into one file and vue-style-loader
      // to add all the styles inside the <style> block in `.vue` file.
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"]
      },

      {
        test: /\.sass$/,
        use: ["vue-style-loader", "sass-loader"]
      },

      // Fonts
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: '/fonts/'
            }
          }
        ]
      }
    ]
  },
  // Where to compile the bundle
  // By default the output directory is `dist`
  output: {
    path: path.join(__dirname, "../dist"),
    filename: "[name].js"
  },
  devServer: {
    contentBase: path.join(__dirname, "../public"),
    port: 3000,
    publicPath: "/dist/"
  },
  plugins: [
    // make sure to include the plugin for the magic
    new VueLoaderPlugin()
  ]
};
