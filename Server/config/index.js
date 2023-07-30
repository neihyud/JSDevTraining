const dotenv = require('dotenv')
dotenv.config()

const configs = {
    PORT: process.env.PORT || 8080,
    DOMAIN:
        process.env.DOMAIN ||
        'https://64be0fb22320b36433c801e4.mockapi.io/api/v1',
}

module.exports = configs
