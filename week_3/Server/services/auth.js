const login = (username, password) => {
    if (username != 'john' || password != '1234') {
        return null
    }
    return { username, password }
}

module.exports = { login }
