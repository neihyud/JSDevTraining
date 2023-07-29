const { validatorLogin } = require('../validators/auth')
const authService = require('../services/auth')

const login = (req, res) => {
    const { username = '', password = '' } = req.body

    const error = validatorLogin(username, password)

    if (error) {
        return res.status(400).json({ success: false, message: error })
    }

    const user = authService.login(username, password)

    if (!user) {
        return res
            .status(401)
            .json({ success: false, message: 'Username or Password invalid!' })
    }
    return res
        .status(200)
        .json({
            success: true,
            message: 'Login success!',
            user: { username, password },
        })
}

module.exports = { login }
