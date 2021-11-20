const isProduction = process.env.NODE_ENV === "production";

let result;
if (isProduction) {
  result = require("dotenv").config({ path: "./config/prod.env" });
} else {
  result = require("dotenv").config({ path: "./config/dev.env" });
}

if (result.error) {
  throw result.error;
}

module.exports = {
  reactStrictMode: true,
};
