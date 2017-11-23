process.env.NODE_ENV = process.env.NODE_ENV || "dev";

const env = process.env.NODE_ENV;
let envConfig = {};
switch (env) {
  case "development":
  case "dev":
    envConfig = require("./dev");
    break;
  case "testing":
  case "test":
    envConfig = require("./test");
    break;
  case "production":
  case "prod":
    envConfig = require("./prod");

    break;
}

module.exports = envConfig;
