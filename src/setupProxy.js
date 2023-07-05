const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "https://dev.internalapi.biip.lt/uetk",
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
