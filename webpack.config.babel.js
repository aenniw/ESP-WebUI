import webpack from "webpack";
import ExtractTextPlugin from "extract-text-webpack-plugin";
import CompressionPlugin from "compression-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ScriptExtHtmlWebpackPlugin from "script-ext-html-webpack-plugin";
import autoprefixer from "autoprefixer";
import OfflinePlugin from "offline-plugin";
import path from "path";
const ENV = process.env.NODE_ENV || "development";

const CSS_MAPS = ENV !== "production";
const devPort = process.env.PORT || 8080;
const devHost = process.env.HOSTNAME || "localhost";
const routes = "./site-routes";

module.exports = {
  context: path.resolve(__dirname, "src"),
  entry: {
    index: routes + "/index.js",
    login: routes + "/login.js"
  },

  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    filename: "[name].js"
  },

  resolve: {
    extensions: [".jsx", ".js", ".json", ".less"],
    modules: [
      path.resolve(__dirname, "src/lib"),
      path.resolve(__dirname, "node_modules"),
      "node_modules"
    ],
    alias: {
      style: path.resolve(__dirname, "src/style"),
      react: "preact-compat",
      "react-dom": "preact-compat"
    }
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: path.resolve(__dirname, "src"),
        enforce: "pre",
        use: "source-map-loader"
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        // Transform our own .(less|css) files with PostCSS and CSS-modules
        test: /\.(less|css)$/,
        include: [path.resolve(__dirname, "src/components")],
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                modules: true,
                sourceMap: CSS_MAPS,
                importLoaders: 1,
                minimize: true
              }
            },
            {
              loader: `postcss-loader`,
              options: {
                sourceMap: CSS_MAPS,
                plugins: () => {
                  autoprefixer({ browsers: ["last 2 versions"] });
                }
              }
            },
            {
              loader: "less-loader",
              options: { sourceMap: CSS_MAPS }
            }
          ]
        })
      },
      {
        test: /\.(less|css)$/,
        exclude: [path.resolve(__dirname, "src/components")],
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: { sourceMap: CSS_MAPS, importLoaders: 1, minimize: true }
            },
            {
              loader: `postcss-loader`,
              options: {
                sourceMap: CSS_MAPS,
                plugins: () => {
                  autoprefixer({ browsers: ["last 2 versions"] });
                }
              }
            },
            {
              loader: "less-loader",
              options: { sourceMap: CSS_MAPS }
            }
          ]
        })
      },
      {
        test: /\.json$/,
        use: "json-loader"
      },
      {
        test: /\.(xml|html|txt|md)$/,
        use: "raw-loader"
      },
      {
        test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i,
        use: ENV === "production" ? "file-loader" : "url-loader"
      }
    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin({
      disable: true
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(ENV)
    }),
    new HtmlWebpackPlugin({
      template: routes + "/index.ejs",
      chunks: ["index"]
    }),
    new HtmlWebpackPlugin({
      template: routes + "/login.ejs",
      chunks: ["login"],
      filename: "login.html"
    }),
    new ScriptExtHtmlWebpackPlugin({
      inline: ["login.js"]
    })
  ].concat(
    ENV === "production"
      ? [
          new webpack.optimize.UglifyJsPlugin({
            output: {
              comments: false
            },
            sourceMap: false,
            compress: {
              unsafe_comps: true,
              properties: true,
              keep_fargs: false,
              pure_getters: true,
              collapse_vars: true,
              unsafe: true,
              warnings: false,
              screw_ie8: true,
              sequences: true,
              dead_code: true,
              drop_debugger: true,
              comparisons: true,
              conditionals: true,
              evaluate: true,
              booleans: true,
              loops: true,
              unused: true,
              hoist_funs: true,
              if_return: true,
              join_vars: true,
              cascade: true,
              drop_console: true
            }
          }),
          new OfflinePlugin({
            relativePaths: false,
            AppCache: false,
            excludes: ["_redirects"],
            ServiceWorker: {
              events: true
            },
            cacheMaps: [
              {
                match: /.*/,
                to: "/",
                requestTypes: ["navigate"]
              }
            ],
            publicPath: "/"
          }),
          new CompressionPlugin({
            filename: "[path].gz[query]",
            deleteOriginalAssets: true
          })
        ]
      : []
  ),

  stats: { colors: true },

  node: {
    global: true,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
    setImmediate: false
  },

  devtool: ENV === "production" ? false : "cheap-module-eval-source-map",

  devServer: {
    setup(app) {
      app.post("*", (req, res) => {
        res.send({ result: true });
      });
    },
    port: devPort,
    host: devHost,
    publicPath: "/",
    contentBase: "./src",
    historyApiFallback: true,
    compress: true,
    hot: true,
    overlay: true,
    open: true,
    openPage: "",
    proxy: {
      "/login": {
        target: "http://" + devHost + ":" + devPort + "/login.html",
        pathRewrite: { "^/login": "" }
      }
    }
  }
};
