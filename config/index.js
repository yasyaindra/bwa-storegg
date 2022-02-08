const env = require("dotenv");
const path = require("path");
env.config();

module.exports = {
  rootPath: path.resolve(__dirname, ".."),
  serviceName: process.env.SERVICE_NAME,
  urlDb: process.env.MONGO_URL,
  jwtKey: process.env.SECRET,
};
