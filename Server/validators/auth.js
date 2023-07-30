const validatorLogin = (username, password) => {
    if (!username.trim() || !password.trim()) {
        return 'Username or Password empty'
    }
    return ''
}

module.exports = { validatorLogin }
