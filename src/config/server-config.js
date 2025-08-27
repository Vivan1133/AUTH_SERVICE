const dotenv = require("dotenv");
dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    SALT: process.env.SALT,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY
}