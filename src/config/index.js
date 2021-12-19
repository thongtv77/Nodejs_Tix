const dotenv = require("dotenv");

dotenv.config();

const server = {
  host: process.env.HOST,
  port: process.env.PORT,
  secretKey: process.env.secretKey,
};

const configEnv = {
  server,
};

module.exports = { configEnv };
