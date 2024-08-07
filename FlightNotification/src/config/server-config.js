const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    
    GMAIL_PASS:process.env.GMAIL_PASS,
    DEMO_EMAIL:process.env.DEMO_EMAIL
}