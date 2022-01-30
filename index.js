// Listen on a specific host via the HOST environment variable
var host = process.env.HOST || "0.0.0.0";
// Listen on a specific port via the PORT environment variable
var port = process.env.PORT || 8080;

var originWhitelist = parseEnvList(process.env.CORSANYWHERE_WHITELIST);
function parseEnvList(env) {
  if (!env) {
    return [];
  }
  return env.split(",");
}

var cors_proxy = require("cors-anywhere");
cors_proxy
  .createServer({
    originWhitelist: originWhitelist, // Allow all origins
    httpProxyOptions: {
      // Do not add X-Forwarded-For, etc. headers, othewise yandex.music will return "400 - Bad Request - Contradictory sheme headers"
      xfwd: false,
    },
  })
  .listen(port, host, function () {
    console.log("Running CORS Anywhere on " + host + ":" + port);
  });
