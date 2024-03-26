const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "https://dev-uetk.biip.lt",
      changeOrigin: true,
      pathRewrite: {
        "^/api": ""
      },
      headers: {
        Connection: "keep-alive"
      }
    })
  );
};
