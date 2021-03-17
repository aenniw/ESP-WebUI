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
  mode: ENV,
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
                importLoaders: 1
              }
            },
            {
              loader: `postcss-loader`,
              options: {
                sourceMap: CSS_MAPS,
                plugins: () => {
                  autoprefixer();
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
              options: { sourceMap: CSS_MAPS, importLoaders: 1 }
            },
            {
              loader: `postcss-loader`,
              options: {
                sourceMap: CSS_MAPS,
                plugins: () => {
                  autoprefixer();
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
        test: /\.(xml|html|txt|md)$/,
        use: "raw-loader"
      },
      {
        test: /\.svg$/,
        use: ['preact-svg-loader'],
      },
      {
        test: /\.(woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i,
        use: ENV === "production" ? "file-loader" : "url-loader"
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      disable: true
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
      app.post("*", (_req, res) => {
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
