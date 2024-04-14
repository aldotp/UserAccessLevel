const dotenv = require("dotenv");

// Load environment variable
dotenv.config();

module.exports = {
  mongoURI: process.env.DB_CONNECTION,
  jwtSecret: process.env.JWT_SECRET,
  port: process.env.PORT,
};
