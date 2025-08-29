const dotenv = require("dotenv");
dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    SALT: process.env.SALT,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    DB_SYNC: process.env.DB_SYNC
    // VERIFY_SEND_EMAIL_FROM: process.env.VERIFY_SEND_EMAIL_FROM,
    // VERIFY_SEND_EMAIL_FROM_PASS: process.env.VERIFY_SEND_EMAIL_FROM_PASS
}